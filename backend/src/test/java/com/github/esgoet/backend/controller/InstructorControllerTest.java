package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class InstructorControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    InstructorRepository instructorRepository;

    @Test
    @WithMockUser
    void getAllInstructorsTest() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/instructors"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void getInstructorByIdTest() throws Exception {
        //GIVEN
        instructorRepository.save(new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of()));
        //WHEN
        mockMvc.perform(get("/api/instructors/1"))
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
    void createInstructorTest() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/instructors")
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
                //THEN
                .andExpect(status().isOk())
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