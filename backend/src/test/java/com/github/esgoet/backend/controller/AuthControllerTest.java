package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.AppUser;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.AppUserRepository;
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
    AppUserRepository appUserRepository;
    @Autowired
    StudentRepository studentRepository;

    @Test
    @DirtiesContext
    @WithMockUser(username = "esgoet")
    void getLoggedInUserTest() throws Exception {
        //GIVEN
        Student student =  studentRepository.save(new Student("s1", List.of(),new HashMap<>()));
        appUserRepository.save(new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", student, null));
        //WHEN
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "username": "esgoet",
                      "email": "esgoet@fakeemail.com",
                      "student": {
                        "id": "s1",
                        "courses": [],
                        "grades": {}
                      },
                      "instructor": null
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
                      "message": "No user found with username: esgoet",
                      "statusCode": 404
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
                       "student": {
                        "courses": [],
                        "grades": {}
                      },
                      "instructor": null
                    }
                    """))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.student.id").exists());
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
                      "student": null,
                      "instructor": {
                        "courses": []
                      }
                    }
                    """))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.instructor.id").exists());
    }
}