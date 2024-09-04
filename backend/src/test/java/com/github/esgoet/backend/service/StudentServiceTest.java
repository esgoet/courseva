package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.StudentResponseDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {
    private final StudentRepository studentRepository = mock(StudentRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final StudentService studentService = new StudentService(studentRepository, idService, passwordEncoder);

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
        NewAppUserDto newUser = new NewAppUserDto("esgoet", "esgoet@fakeemail.com","123", AppUserRole.STUDENT);
        Student newStudent =  new Student("1","esgoet","esgoet@fakeemail.com","encodedPassword", List.of(), new HashMap<>());
        when(idService.randomId()).thenReturn("1");
        when(passwordEncoder.encode("123")).thenReturn("encodedPassword");
        when(studentRepository.save(newStudent)).thenReturn(newStudent);
        //WHEN
        StudentResponseDto actual = studentService.createStudent(newUser);
        //THEN
        StudentResponseDto expected = new StudentResponseDto("1","esgoet","esgoet@fakeemail.com", List.of(), new HashMap<>());
        verify(idService).randomId();
        verify(passwordEncoder).encode("123");
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