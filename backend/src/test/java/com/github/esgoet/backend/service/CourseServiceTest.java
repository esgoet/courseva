package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewCourseDto;
import com.github.esgoet.backend.exception.CourseNotFoundException;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CourseServiceTest {
    private final CourseRepository courseRepository = mock(CourseRepository.class);
    private final IdService idService = mock(IdService.class);
    private final CourseService courseService = new CourseService(courseRepository, idService);

    private final LocalDate startDate = LocalDate.parse("2024-07-27");

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
        List<Course> courses = List.of(new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate));
        when(courseRepository.findAll()).thenReturn(courses);
        //WHEN
        List<Course> actual = courseService.getAllCourses();
        //THEN
        List<Course> expected = List.of(new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate));
        verify(courseRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getCourseByIdTest_whenCourseExists_thenReturnCourse() {
        //GIVEN
        Course course = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
        when(courseRepository.findById("1")).thenReturn(Optional.of(course));
        //WHEN
        Course actual = courseService.getCourseById("1");
        //THEN
        Course expected =  new Course("1", "Math 101", "This is Math 101",  List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
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

    @Test
    void createCourseTest_whenGivenCourseDto_thenReturnCourse() {
        //GIVEN
        Course course = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
        NewCourseDto courseDto = new NewCourseDto("Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2"), startDate);
        when(idService.generateCourseId(courseDto.title(),courseDto.startDate())).thenReturn("1");
        when(courseRepository.save(course)).thenReturn(course);
        //WHEN
        Course actual = courseService.createCourse(courseDto);
        //THEN
        Course expected = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
        verify(idService).generateCourseId(courseDto.title(),courseDto.startDate());
        verify(courseRepository).save(course);
        assertEquals(expected, actual);

    }
}