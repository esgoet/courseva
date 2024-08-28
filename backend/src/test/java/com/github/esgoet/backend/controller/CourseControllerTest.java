package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
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

    private final LocalDate startDate = LocalDate.parse("2024-07-27");

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
        courseRepository.save(new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("s1","s2"),  List.of("i1","i2"), startDate));
        //WHEN
        mockMvc.perform(get("/api/courses/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                      "id": "1",
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "lessons": [],
                      "assignments": [],
                      "students": ["1","2"],
                      "instructors": ["1","2"],
                      "startDate": "2024-07-27"
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

    @Test
    void createCourseTest() throws Exception {
        //WHEN
        mockMvc.perform(post("/api/courses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""" 
                    {
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "students": [],
                      "instructors": [],
                      "startDate": "2024-07-27"
                    }
                    """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                   {
                      "id": "math-101-24-07-27-1",
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "lessons": [],
                      "assignments": [],
                      "students": [],
                      "instructors": [],
                      "startDate": "2024-07-27"
                    }
                   """));
    }

    @Test
    void updateCourseTest_whenCourseExists() throws Exception {
        //GIVEN
        courseRepository.save(new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("s1","s2"),  List.of("i1","i2"), startDate));
        //WHEN
        mockMvc.perform(put("/api/courses/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                   {
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "lessons": [],
                      "assignments": [],
                      "students": ["s1","s2","s3"],
                      "instructors": ["i1"],
                      "startDate": "2024-07-27"
                    }
                   """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                   {
                      "id": "1",
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "lessons": [],
                      "assignments": [],
                      "students": ["s1","s2","s3"],
                      "instructors": ["i1"],
                      "startDate": "2024-07-27"
                    }
                   """));
    }

    @Test
    void updateCourseTest_whenCourseDoesNotExist() throws Exception {
        //WHEN
        mockMvc.perform(put("/api/courses/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                   {
                      "title": "Math 101",
                      "description": "This is Math 101",
                      "lessons": [],
                      "assignments": [],
                      "students": ["s1","s2","s3"],
                      "instructors": ["i1"],
                      "startDate": "2024-07-27"
                    }
                   """))
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