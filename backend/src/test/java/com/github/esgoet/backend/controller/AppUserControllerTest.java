package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.AppUser;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.AppUserRepository;
import com.github.esgoet.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AppUserControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    InstructorRepository instructorRepository;

    @Test
    @WithMockUser
    @DirtiesContext
    void updateAppUserTest_whenUserExists() throws Exception {
        //GIVEN
        Instructor instructor = instructorRepository.save(new Instructor("i1", new ArrayList<>()));
        appUserRepository.save(new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword",null, instructor));
        //WHEN
        mockMvc.perform(put("/api/users/1")
                .with(csrf().asHeader())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "username": "esgoet",
                          "email": "esgoet@updatedemail.com"
                        }"""))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "id": "1",
                          "username": "esgoet",
                          "email": "esgoet@updatedemail.com",
                          "student": null,
                          "instructor": {
                            "id": "i1",
                            "courses": []
                          }
                        }"""));
    }

    @Test
    @WithMockUser
    void updateAppUserTest_whenUserDoesNotExists() throws Exception {
        //WHEN
        mockMvc.perform(put("/api/users/1")
                        .with(csrf().asHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                          "username": "esgoet",
                          "email": "esgoet@updatedemail.com"
                        }"""))
                //THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message": "No user found with id: 1",
                          "statusCode": 404
                        }"""))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    void deleteAppUserTest() throws Exception {
        //GIVEN
        appUserRepository.save(new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword",null, new Instructor("i1", List.of())));
        //WHEN
        mockMvc.perform(delete("/api/users/1").with(csrf().asHeader()))
                //THEN
                .andExpect(status().isNoContent());
    }
}