package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StudentControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    StudentRepository studentRepository;

    @Test
    @WithMockUser
    void getAllStudentsTest() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/students"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getStudentByIdTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("s1", "esgoet", new ArrayList<>(), new HashMap<>()));
        //WHEN
        mockMvc.perform(get("/api/students/s1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                      {
                          "id": "s1",
                          "username": "esgoet",
                          "courses": [],
                          "grades": {}
                      }
                      """));
    }


    @Test
    @WithMockUser
    @DirtiesContext
    void updateStudentTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("s1", "esgoet", new ArrayList<>(), new HashMap<>()));
        //WHEN
        mockMvc.perform(put("/api/students/s1")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "username": "esgoet",
                              "courses": ["courseId-1"],
                              "grades": {}
                            }
                            """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "id": "s1",
                          "username": "esgoet",
                          "courses": ["courseId-1"],
                          "grades": {}
                        }
                """));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void updateStudentTest_whenStudentDoesNotExist() throws Exception {
       //WHEN
        mockMvc.perform(put("/api/students/s1")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "username": "esgoet",
                              "courses": ["courseId-1"],
                              "grades": {}
                            }
                            """))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message": "No student found with id: s1",
                           "statusCode": 404
                        }
                        """))
                .andExpect(jsonPath("$.timestamp").exists());
    }


    @Test
    @WithMockUser(authorities = {"INSTRUCTOR"})
    @DirtiesContext
    void updateStudentGradesTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("s1", "esgoet", List.of("courseId"), new HashMap<>()));
        //WHEN
        mockMvc.perform(put("/api/students/s1/grades")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "courseId": {
                                "assignmentId": "assignmentId",
                                "grade": 70
                              }
                            }
                            """))
                        .andExpect(status().isOk())
                        .andExpect(content().json("""
                                {
                                  "id": "s1",
                                  "username": "esgoet",
                                  "courses": ["courseId"],
                                  "grades": {"courseId": [
                                          {
                                            "assignmentId": "assignmentId",
                                            "grade": 70
                                          }
                                        ]}
                                }
                                """));

    }

    @Test
    @WithMockUser(authorities = {"INSTRUCTOR"})
    @DirtiesContext
    void updateStudentGradesTest_whenStudentDoesNotExist() throws Exception {
        //WHEN
        mockMvc.perform(put("/api/students/s1/grades")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "courseId": {
                                "assignmentId": "assignmentId",
                                "grade": 70
                              }
                            }
                            """))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message": "No student found with id: s1",
                          "statusCode": 404
                        }
                        """))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}