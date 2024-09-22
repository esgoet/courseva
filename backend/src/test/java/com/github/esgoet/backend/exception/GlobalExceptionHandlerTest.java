package com.github.esgoet.backend.exception;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GlobalExceptionHandlerTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @WithMockUser
    void handleCourseNotFoundExceptionTest() throws Exception {
        mockMvc.perform(get("/api/courses/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No course found with id: 999",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());

    }

    @Test
    @WithMockUser
    void handleUserNotFoundExceptionTest_forStudents() throws Exception {
        mockMvc.perform(get("/api/students/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No student found with id: 999",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @WithMockUser
    void handleUserNotFoundExceptionTest_forInstructors() throws Exception {
        mockMvc.perform(get("/api/instructors/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No instructor found with id: 999",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @WithMockUser(username = "esgoet@fakeemail.com")
    void handleUsernameNotFoundExceptionTest() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No user found with email: esgoet@fakeemail.com",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @WithMockUser(authorities = {"INSTRUCTOR"})
    void handleExceptionTest() throws Exception {
        mockMvc.perform(post("/api/courses")
                        .with(csrf().asHeader()))
                .andExpect(status().isInternalServerError())
                .andExpect(content().json("""
                    {
                      "statusCode": 500
                    }
                    """))
                .andExpect(jsonPath("$.message").exists())
                .andExpect(jsonPath("$.timestamp").exists());
    }
}