package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {
    private final StudentRepository studentRepository = mock(StudentRepository.class);
    private final IdService idService = mock(IdService.class);
    private final StudentService studentService = new StudentService(studentRepository, idService);

    @Test
    void getStudentByGitHubIdTest_whenStudentExists() {
        //GIVEN
        Student student = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        when(studentRepository.findByGitHubId("123")).thenReturn(Optional.of(student));
        //WHEN
        Student actual = studentService.getStudentByGitHubId("123");
        //THEN
        Student expected = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        verify(studentRepository).findByGitHubId("123");
        assertEquals(expected, actual);
    }

    @Test
    void getStudentByGitHubIdTest_whenStudentDoesNotExist() {
        //GIVEN
        when(studentRepository.findByGitHubId("123")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.getStudentByGitHubId("123"));
        verify(studentRepository).findByGitHubId("123");
        assertEquals("No student found with GitHub Id: 123", thrown.getMessage());
    }

    @Test
    void getStudentByIdTest_whenStudentExists() {
        //GIVEN
        Student student = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        when(studentRepository.findById("1")).thenReturn(Optional.of(student));
        //WHEN
        Student actual = studentService.getStudentById("1");
        //THEN
        Student expected = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        verify(studentRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getStudentByIdTest_whenStudentDoesNotExist() {
        //GIVEN
        when(studentRepository.findById("1")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.getStudentById("1"));
        verify(studentRepository).findById("1");
        assertEquals("No student found with id: 1", thrown.getMessage());
    }

    @Test
    void createStudentTest() {
        //GIVEN
        NewUserDto newUser = new NewUserDto("esgoet", "esgoet@fakeemail.com","123");
        Student newStudent =  new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        when(idService.randomId()).thenReturn("1");
        when(studentRepository.save(newStudent)).thenReturn(newStudent);
        //WHEN
        Student actual = studentService.createStudent(newUser);
        //THEN
        Student expected = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        verify(idService).randomId();
        verify(studentRepository).save(newStudent);
        assertEquals(expected, actual);
    }

    @Test
    void getAllStudentsTest() {
        //GIVEN
        List<Student> students = List.of(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>()));
        when(studentRepository.findAll()).thenReturn(students);
        //WHEN
        List<Student> actual = studentService.getAllStudents();
        //THEN
        List<Student> expected = List.of(new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>()));
        verify(studentRepository).findAll();
        assertEquals(expected, actual);
    }
}