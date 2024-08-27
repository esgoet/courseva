package com.github.esgoet.backend.service;

import com.github.esgoet.backend.exception.CourseNotFoundException;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CourseServiceTest {
    private final CourseRepository courseRepository = mock(CourseRepository.class);
    private final CourseService courseService = new CourseService(courseRepository);

    @Test
    void getAllCoursesTest_whenEmptyDb_thenReturnEmptyList() {
        //GIVEN
        when(courseRepository.findAll()).thenReturn(List.of());
        //WHEN
        List<Course> actual = courseService.getAllCourses();
        //THEN
        List<Course> expected = new ArrayList<>();
        verify(courseRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllCoursesTest_whenCoursesExist_thenReturnListOfCourses() {
        //GIVEN
        List<Course> courses = List.of(new Course("1", "Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2")));
        when(courseRepository.findAll()).thenReturn(courses);
        //WHEN
        List<Course> actual = courseService.getAllCourses();
        //THEN
        List<Course> expected = List.of(new Course("1", "Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2")));
        verify(courseRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getCourseByIdTest_whenCourseExists_thenReturnCourse() {
        //GIVEN
        Course course = new Course("1", "Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2"));
        when(courseRepository.findById("1")).thenReturn(Optional.of(course));
        //WHEN
        Course actual = courseService.getCourseById("1");
        //THEN
        Course expected =  new Course("1", "Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2"));
        verify(courseRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getCourseByIdTest_whenCourseDoesNotExist_thenThrowException() {
        //GIVEN
        when(courseRepository.findById("1")).thenReturn(Optional.empty());
        //THEN
        assertThrows(CourseNotFoundException.class,
                //WHEN
                () -> courseService.getCourseById("1"));
        verify(courseRepository).findById("1");
    }
}