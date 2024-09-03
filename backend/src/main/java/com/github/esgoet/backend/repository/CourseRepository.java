package com.github.esgoet.backend.repository;

import com.github.esgoet.backend.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findCoursesByStudentsContaining(String studentId);
    List<Course> findCoursesByInstructorsContaining(String instructorId);
}
