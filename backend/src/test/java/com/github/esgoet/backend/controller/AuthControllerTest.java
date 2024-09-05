package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.InstructorRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    InstructorRepository instructorRepository;

    @Test
    @DirtiesContext
    @WithMockUser(username = "esgoet")
    void getLoggedInUserTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(),new HashMap<>()));
        //WHEN
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "username": "esgoet",
                      "email": "esgoet@fakeemail.com",
                      "courses": [],
                      "grades": {}
                    }
                    """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "esgoet")
    void getLoggedInUserTest_whenNoStudentButInstructorWithId() throws Exception {
        //GIVEN
        instructorRepository.save(new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of()));
        //WHEN
        mockMvc.perform(get("/api/auth/me"))
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
    @DirtiesContext
    @WithMockUser(username = "esgoet")
    void getLoggedInUserTest_whenNoLoggedInUserWithId() throws Exception {
       //WHEN
        mockMvc.perform(get("/api/auth/me"))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No instructor found with username: esgoet",
                      "statusCode":404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DirtiesContext
    void registerTest_whenRoleIsStudent() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/auth/register")
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
                .andExpect(status().isCreated())
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
    @DirtiesContext
    void registerTest_whenRoleIsInstructor() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/auth/register")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                      "username": "esgoet",
                      "email": "esgoet@fakeemail.com",
                      "password": "123",
                      "role": "INSTRUCTOR"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                    {
                      "username": "esgoet",
                      "email": "esgoet@fakeemail.com",
                      "courses": []
                    }
                    """))
                .andExpect(jsonPath("$.id").exists());
    }
}