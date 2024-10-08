package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.NewCourseDto;
import com.github.esgoet.backend.dto.UpdateCourseDto;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody NewCourseDto courseDto) {
        return courseService.createCourse(courseDto);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id, @RequestBody UpdateCourseDto courseDto) {
        return courseService.updateCourse(id, courseDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }

}
