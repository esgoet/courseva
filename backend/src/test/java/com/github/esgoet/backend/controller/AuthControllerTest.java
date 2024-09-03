package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.InstructorRepository;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    void getUserTest() throws Exception {
        //GIVEN
        studentRepository.save(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(),new HashMap<>()));
        //WHEN
        mockMvc.perform(get("/api/auth/me")
                .with(oidcLogin().idToken(token -> token.subject("123"))
                        .userInfoToken(token -> token.claim("login", "esgoet"))))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "username": "esgoet",
                      "email": "esgoet@fakeemail.com",
                      "gitHubId": "123",
                      "courses": [],
                      "grades": {}
                    }
                    """));
    }

    @Test
    @DirtiesContext
    void getUserTest_whenNoStudentWithId() throws Exception {
        //GIVEN
        instructorRepository.save(new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of()));
        //WHEN
        mockMvc.perform(get("/api/auth/me")
                        .with(oidcLogin().idToken(token -> token.subject("123"))
                                .userInfoToken(token -> token.claim("login", "esgoet"))))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                 
                    """));
    }
}