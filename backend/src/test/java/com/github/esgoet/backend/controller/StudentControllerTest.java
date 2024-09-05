package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.StudentUpdateDto;
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
    void getStudentByIdByIdTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>()));
        //WHEN
        mockMvc.perform(get("/api/students/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                      {
                          "id": "1",
                          "username": "esgoet",
                          "email": "esgoet@fakeemail.com",
                          "courses": []
                      }
                      """));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void createStudentTest() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/students")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                         {
                          "username": "esgoet",
                          "email": "esgoet@fakeemail.com",
                          "password": "123",
                          "role": "STUDENT"
                        }
                        """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "username": "esgoet",
                          "email": "esgoet@fakeemail.com",
                          "courses": [],
                          "grades": {}
                        }
                """))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void updateStudentTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>()));
        //WHEN
        mockMvc.perform(put("/api/students/1")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "username": "esgoet",
                              "email": "esgoet@fakeemail.com",
                              "password": "123",
                              "courses": ["courseId-1"],
                              "grades": {}
                            }
                            """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "id": "1",
                          "username": "esgoet",
                          "email": "esgoet@fakeemail.com",
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
        mockMvc.perform(put("/api/students/1")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                              "username": "esgoet",
                              "email": "esgoet@fakeemail.com",
                              "password": "123",
                              "courses": ["courseId-1"],
                              "grades": {}
                            }
                            """))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message": "No student found with id: 1",
                           "statusCode": 404
                        }
                        """))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}