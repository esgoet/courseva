package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CourseControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    CourseRepository courseRepository;

    @Test
    void getAllCoursesTest() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/courses"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getCourseByIdTest_whenCourseExists() throws Exception {
        //GIVEN
        courseRepository.save(new Course("1", "Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2")));
        //WHEN
        mockMvc.perform(get("/api/courses/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "students": ["1","2"],
                      "instructors": ["1","2"]
                    }
                    """));
    }

    @Test
    void getCourseByIdTest_whenCourseDoesNotExist() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/courses/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                      "message": "No course found with id: 1",
                      "statusCode": 404
                    }
                    """))
                .andExpect(jsonPath("$.timestamp").exists());
    }
}