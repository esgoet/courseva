package com.github.esgoet.backend.service;

import com.github.esgoet.backend.exception.CourseNotFoundException;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElseThrow(()-> new CourseNotFoundException("No course found with id: " + id));
    }
}
