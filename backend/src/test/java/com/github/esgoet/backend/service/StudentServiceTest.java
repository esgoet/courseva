package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Grade;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {
    private final StudentRepository studentRepository = mock(StudentRepository.class);
    private final IdService idService = mock(IdService.class);
    private final StudentService studentService = new StudentService(studentRepository, idService);

    @Test
    void getStudentByIdTest_whenStudentExists() {
        //GIVEN
        Student student = new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>());
        when(studentRepository.findById("s-1")).thenReturn(Optional.of(student));
        //WHEN
        Student actual = studentService.getStudentById("s-1");
        //THEN
        Student expected = new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>());
        verify(studentRepository).findById("s-1");
        assertEquals(expected, actual);
    }

    @Test
    void getStudentByIdTest_whenStudentNotFound() {
        //GIVEN
        when(studentRepository.findById("s-1")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.getStudentById("s-1"));
        verify(studentRepository).findById("s-1");
        assertEquals("No student found with id: s-1", thrown.getMessage());
    }

    @Test
    void createStudentTest() {
        //GIVEN
        Student student =  new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>());
        when(idService.randomId()).thenReturn("1");
        when(studentRepository.save(student)).thenReturn(student);
        //WHEN
        Student actual = studentService.createStudent("esgoet");
        //THEN
        Student expected = new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>());
        verify(idService).randomId();
        verify(studentRepository).save(student);
        assertEquals(expected, actual);
    }

    @Test
    void getAllStudentsTest() {
        //GIVEN
        List<Student> students = List.of(new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>()));
        when(studentRepository.findAll()).thenReturn(students);
        //WHEN
        List<Student> actual = studentService.getAllStudents();
        //THEN
        List<Student> expected = List.of(new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>()));
        verify(studentRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void updateStudentTest_whenStudentExists() {
        //GIVEN
        Student existingStudent = new Student("s-1", "esgoet", new ArrayList<>(), new HashMap<>());
        StudentUpdateDto updatedStudentDto = new StudentUpdateDto("esgoet", List.of("courseId-1"), new HashMap<>());
        Student updatedStudent = new Student("s-1", "esgoet", List.of("courseId-1"), new HashMap<>());
        when(studentRepository.findById("s-1")).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(updatedStudent)).thenReturn(updatedStudent);
        //WHEN
        Student actual = studentService.updateStudent("s-1", updatedStudentDto);
        // THEN
        Student expected = new Student("s-1", "esgoet", List.of("courseId-1"), new HashMap<>());
        verify(studentRepository).findById("s-1");
        verify(studentRepository).save(updatedStudent);
        assertEquals(expected, actual);
    }


    @Test
    void updateStudentTest_whenStudentNotFound() {
        //GIVEN
        StudentUpdateDto updatedStudentDto = new StudentUpdateDto("esgoet", List.of("courseId-1"), new HashMap<>());
        when(studentRepository.findById("s-1")).thenReturn(Optional.empty());
        // THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.updateStudent("s-1",updatedStudentDto));
        verify(studentRepository).findById("s-1");
        verify(studentRepository, never()).save(any());
        assertEquals("No student found with id: s-1", thrown.getMessage());
    }

    @Test
    void deleteStudentTest() {
        //GIVEN
        doNothing().when(studentRepository).deleteById("s-1");
        //WHEN
        studentService.deleteStudent("s-1");
        //THEN
        verify(studentRepository).deleteById("s-1");
    }

    @Test
    void updateStudentGradesTest_whenStudentExistsAndGradeDoesNotExist() {
        //GIVEN
        Student existingStudent = new Student("s-1", "esgoet", List.of("courseId"), new HashMap<>());
        Student updatedStudent = new Student("s-1", "esgoet", List.of("courseId"), Map.of("courseId", List.of(new Grade("assignmentId", 70))));
        when(studentRepository.findById("s-1")).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(updatedStudent)).thenReturn(updatedStudent);
        Map.Entry<String, Grade> gradeToAdd = new AbstractMap.SimpleEntry<>("courseId", new Grade("assignmentId", 70));
        //WHEN
        Student actual = studentService.updateStudentGrades("s-1", gradeToAdd);
        //THEN
        Student expected = new Student("s-1", "esgoet", List.of("courseId"), Map.of("courseId", List.of(new Grade("assignmentId", 70))));
        verify(studentRepository).findById("s-1");
        verify(studentRepository).save(updatedStudent);
        assertEquals(expected, actual);

    }

    @Test
    void updateStudentGradesTest_whenStudentAndGradeExists() {
        //GIVEN
        Student existingStudent = new Student("s-1", "esgoet", List.of("courseId"), Map.of("courseId", List.of(new Grade("assignmentId", 70))));
        Student updatedStudent = new Student("s-1", "esgoet", List.of("courseId"), Map.of("courseId", List.of(new Grade("assignmentId", 75))));
        Map.Entry<String, Grade> gradeToAdd = new AbstractMap.SimpleEntry<>("courseId", new Grade("assignmentId", 75));

        when(studentRepository.findById("s-1")).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(updatedStudent)).thenReturn(updatedStudent);

        //WHEN
        Student actual = studentService.updateStudentGrades("s-1", gradeToAdd);
        //THEN
        Student expected = new Student("s-1","esgoet", List.of("courseId"), Map.of("courseId", List.of(new Grade("assignmentId", 75))));
        verify(studentRepository).findById("s-1");
        verify(studentRepository).save(updatedStudent);
        assertEquals(expected, actual);

    }

    @Test
    void updateStudentGradesTest_whenStudentNotFound() {
        //GIVEN
        when(studentRepository.findById("s-1")).thenReturn(Optional.empty());
        Map.Entry<String, Grade> gradeToAdd = new AbstractMap.SimpleEntry<>("courseId", new Grade("assignmentId", 75));

        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.updateStudentGrades("s-1",gradeToAdd));
        verify(studentRepository).findById("s-1");
        verify(studentRepository, never()).save(any());
        assertEquals("No student found with id: s-1", thrown.getMessage());
    }

}