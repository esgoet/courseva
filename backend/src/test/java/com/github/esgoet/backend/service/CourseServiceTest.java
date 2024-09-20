package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewCourseDto;
import com.github.esgoet.backend.dto.UpdateCourseDto;
import com.github.esgoet.backend.exception.CourseNotFoundException;
import com.github.esgoet.backend.model.Assignment;
import com.github.esgoet.backend.model.Course;
import com.github.esgoet.backend.model.Lesson;
import com.github.esgoet.backend.model.Submission;
import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final LocalDateTime localDateTime = LocalDateTime.parse("2024-07-27T12:00:00");

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
        CourseNotFoundException exception = assertThrows(CourseNotFoundException.class,
                //WHEN
                ()-> courseService.getCourseById("1"));
        assertEquals("No course found with id: 1", exception.getMessage());
        verify(courseRepository).findById("1");
    }

    @Test
    void createCourseTest_whenGivenCourseDto_thenReturnCourse() {
        //GIVEN
        Course course = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
        NewCourseDto courseDto = new NewCourseDto("Math 101", "This is Math 101", List.of("1","2"),  List.of("1","2"), startDate);
        when(idService.generateCourseId(courseDto.title())).thenReturn("1");
        when(courseRepository.save(course)).thenReturn(course);
        //WHEN
        Course actual = courseService.createCourse(courseDto);
        //THEN
        Course expected = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("1","2"),  List.of("1","2"), startDate);
        verify(idService).generateCourseId(courseDto.title());
        verify(courseRepository).save(course);
        assertEquals(expected, actual);

    }

    @Test
    void updateCourseTest_whenCourseExists() {
        //GIVEN
        Course course = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of(),  List.of("i-1"), startDate);
        UpdateCourseDto courseDto = new UpdateCourseDto("Math 101", "This is Math 101", List.of(), List.of(), List.of("s-1","s-2","s-3"),  List.of("i-1","i-2"), startDate);
        Course updatedCourse = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("s-1","s-2","s-3"),  List.of("i-1","i-2"), startDate);
        when(courseRepository.findById("1")).thenReturn(Optional.of(course));
        when(courseRepository.save(updatedCourse)).thenReturn(updatedCourse);
        //WHEN
        Course actual = courseService.updateCourse("1", courseDto);
        //THEN
        Course expected = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("s-1","s-2","s-3"),  List.of("i-1","i-2"), startDate);
        verify(courseRepository).findById("1");
        verify(courseRepository).save(updatedCourse);
        assertEquals(expected, actual);
    }

    @Test
    void updateCourseTest_whenCourseExists_withUpdatingLessonsAndAssignments() {
        //GIVEN
        String existingCourseId = "1";
        String newLessonId = "lesson-2";
        String newAssignmentId = "assignment-2";
        String newSubmissionId = "submission-2";

        Lesson lessonWithId = new Lesson("lesson-1", "Lesson 1", "Introduction to Math", localDateTime);
        Lesson lessonWithoutId = new Lesson("", "Lesson 2", "Advanced Math", localDateTime);

        Submission submissionWithId = new Submission("submission-1", "s-1", "answer", "feedback", 70, localDateTime);
        Submission submissionWithoutId = new Submission("", "s-2", "group answer","feedback", 75, localDateTime);

        Assignment assignmentWithId = new Assignment("assignment-1", "Assignment 1", "Solve problems", localDateTime, localDateTime.plusDays(7), List.of(submissionWithId));
        Assignment assignmentWithoutId = new Assignment("", "Assignment 2", "Group project", localDateTime, localDateTime.plusDays(7), List.of(submissionWithoutId));
        UpdateCourseDto courseDto = new UpdateCourseDto(
                "Math 101",
                "This is Math 101",
                List.of(lessonWithId, lessonWithoutId),
                List.of(assignmentWithId, assignmentWithoutId),
                List.of("s-1", "s-2", "s-3"),
                List.of("i-1", "i-2"),
                startDate);
        Course existingCourse = new Course(
                existingCourseId,
                "Math 101",
                "This is Math 101",
                List.of(lessonWithId),
                List.of(assignmentWithId),
                List.of(),
                List.of("i-1"),
                startDate);
        Course updatedCourse = new Course(
                existingCourseId,
                "Math 101",
                "This is Math 101",
                List.of(lessonWithId,lessonWithoutId.withId(newLessonId)),
                List.of(assignmentWithId, assignmentWithoutId
                        .withId(newAssignmentId)
                        .withSubmissions(List.of(submissionWithoutId.withId(newSubmissionId)))),
                List.of("s-1", "s-2", "s-3"),
                List.of("i-1", "i-2"),
                startDate);
        when(idService.randomId()).thenReturn(newLessonId, newAssignmentId, newSubmissionId);
        when(courseRepository.findById(existingCourseId)).thenReturn(Optional.of(existingCourse));
        when(courseRepository.save(updatedCourse)).thenReturn(updatedCourse);

        //WHEN
        Course actual = courseService.updateCourse(existingCourseId, courseDto);

        //THEN
        Course expected = new Course(existingCourseId,
                "Math 101",
                "This is Math 101",
                List.of(lessonWithId, lessonWithoutId.withId(newLessonId)),
                List.of(assignmentWithId, assignmentWithoutId
                                .withId(newAssignmentId)
                                .withSubmissions(List.of(submissionWithoutId.withId(newSubmissionId)))),
                List.of("s-1", "s-2", "s-3"),
                List.of("i-1", "i-2"),
                startDate);
        verify(courseRepository).findById(existingCourseId);
        verify(idService, times(3)).randomId();
        verify(courseRepository).save(updatedCourse);
        assertEquals(expected, actual);
    }



    @Test
    void updateCourseTest_whenCourseDoesNotExist() {
        //GIVEN
        UpdateCourseDto courseDto = new UpdateCourseDto("Math 101", "This is Math 101", List.of(), List.of(), List.of("s-1","s-2","s-3"),  List.of("i-1","i-2"), startDate);
        Course updatedCourse = new Course("1", "Math 101", "This is Math 101", List.of(), List.of(), List.of("s-1","s-2","s-3"),  List.of("i-1","i-2"), startDate);
        when(courseRepository.findById("1")).thenReturn(Optional.empty());
        //THEN
        CourseNotFoundException exception = assertThrows(CourseNotFoundException.class,
                //WHEN
                ()-> courseService.updateCourse("1", courseDto));
        assertEquals("No course found with id: 1", exception.getMessage());
        verify(courseRepository).findById("1");
        verify(courseRepository, never()).save(updatedCourse);
    }

    @Test
    void deleteCourseTest() {
        //GIVEN
        doNothing().when(courseRepository).deleteById("1");
        //WHEN
        courseService.deleteCourse("1");
        //THEN
        verify(courseRepository).deleteById("1");
    }
}