package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewCourseDto;
import com.github.esgoet.backend.dto.UpdateCourseDto;
import com.github.esgoet.backend.exception.CourseNotFoundException;
import com.github.esgoet.backend.model.Assignment;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.model.Lesson;
import com.github.esgoet.backend.model.Submission;
import com.github.esgoet.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final IdService idService;


    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id).orElseThrow(()-> new CourseNotFoundException("No course found with id: " + id));
    }

    public Course createCourse(NewCourseDto courseDto) {
        Course course = new Course(idService.generateCourseId(courseDto.title(), courseDto.startDate()),courseDto.title(), courseDto.description(),List.of(), List.of(), courseDto.students(), courseDto.instructors(), courseDto.startDate());
        return courseRepository.save(course);
    }

    public Course updateCourse(String id, UpdateCourseDto courseDto) {
        List<Lesson> lessons = courseDto.lessons().stream().map(lesson -> {
            if (lesson.id().isEmpty()) {
                return lesson.withId(idService.randomId());
            }
            return lesson;
        }).toList();

        List<Assignment> assignments = courseDto.assignments().stream().map(assignment -> {
            Assignment updatedAssignment = assignment;
            if (assignment.id().isEmpty()) {
                updatedAssignment = assignment.withId(idService.randomId());
           }
            List<Submission> updatedSubmissions = assignment.submissions().stream().map(submission -> {
                if (submission.id().isEmpty()) {
                    return submission.withId(idService.randomId());
                }
                return submission;
            }).toList();
            return updatedAssignment.withSubmissions(updatedSubmissions);
        }).toList();

        Course course = courseRepository.findById(id).orElseThrow(()-> new CourseNotFoundException("No course found with id: " + id))
                .withTitle(courseDto.title())
                .withDescription(courseDto.description())
                .withLessons(lessons)
                .withAssignments(assignments)
                .withStudents(courseDto.students())
                .withInstructors(courseDto.instructors())
                .withStartDate(courseDto.startDate());
        return courseRepository.save(course);
    }
}
