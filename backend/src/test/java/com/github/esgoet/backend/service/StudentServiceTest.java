package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.StudentResponseDto;
import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        StudentResponseDto actual = studentService.getStudentById("1");
        //THEN
        StudentResponseDto expected = new StudentResponseDto("1","esgoet","esgoet@fakeemail.com", List.of(), new HashMap<>());
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
        List<StudentResponseDto> actual = studentService.getAllStudents();
        //THEN
        List<StudentResponseDto> expected = List.of(new StudentResponseDto("1","esgoet","esgoet@fakeemail.com", List.of(), new HashMap<>()));
        verify(studentRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getLoggedInStudentTest() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        Student student = new Student("1", "esgoet", "esgoet@fakeemail.com", "123", List.of(), new HashMap<>());
        when(studentRepository.findStudentByUsername("esgoet")).thenReturn(Optional.of(student));

        //WHEN
        StudentResponseDto actual = studentService.getLoggedInStudent();

        // THEN
        StudentResponseDto expected = new StudentResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of(), new HashMap<>());
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(studentRepository).findStudentByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void getLoggedInStudentTest_whenUserNotKnown() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(studentRepository.findStudentByUsername("esgoet")).thenReturn(Optional.empty());

        // THEN
        assertThrows(UsernameNotFoundException.class,
                //WHEN
                () -> studentService.getLoggedInStudent());
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(studentRepository).findStudentByUsername("esgoet");
    }


    @Test
    void convertToStudentResponseDtoTest() {
        //GIVEN
        Student student = new Student("1", "esgoet", "esgoet@fakeemail.com", "123", List.of(), new HashMap<>());
        //WHEN
        StudentResponseDto actual = studentService.convertToStudentResponseDto(student);
        // THEN
        StudentResponseDto expected = new StudentResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of(), new HashMap<>());
        assertEquals(expected, actual);
    }

    @Test
    void updateStudentTest_whenUserExists() {
        //GIVEN
        Student existingStudent = new Student("1", "esgoet", "esgoet@fakeemail.com", "123", List.of("couseId-1"), new HashMap<>());
        StudentUpdateDto updatedStudentDto = new StudentUpdateDto("esgoet", "esgoet@fakeemail.com",  List.of("courseId-1"), new HashMap<>());
        Student updatedStudent = new Student("1", "esgoet", "esgoet@fakeemail.com", "123", List.of("courseId-1"), new HashMap<>());
        when(studentRepository.findById("1")).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(updatedStudent)).thenReturn(updatedStudent);
        //WHEN
        StudentResponseDto actual = studentService.updateStudent("1", updatedStudentDto);
        // THEN
        StudentResponseDto expected = new StudentResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of("courseId-1"), new HashMap<>());
        verify(studentRepository).findById("1");
        verify(studentRepository).save(updatedStudent);
        assertEquals(expected, actual);
    }


    @Test
    void updateStudentTest_whenUserIsNotFound() {
        //GIVEN
        StudentUpdateDto updatedStudentDto = new StudentUpdateDto("esgoet", "esgoet@fakeemail.com", List.of("courseId-1"), new HashMap<>());
        when(studentRepository.findById("1")).thenReturn(Optional.empty());
        // THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> studentService.updateStudent("1",updatedStudentDto));
        verify(studentRepository).findById("1");
        verify(studentRepository, never()).save(any());
        assertEquals("No student found with id: 1", thrown.getMessage());
    }

    @Test
    void getStudentByUsernameTest() {
        //GIVEN
        Student student = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        when(studentRepository.findStudentByUsername("esgoet")).thenReturn(Optional.of(student));
        //WHEN
        Student actual = studentService.getStudentByUsername("esgoet");
        //THEN
        Student expected = new Student("1","esgoet","esgoet@fakeemail.com", "123", List.of(), new HashMap<>());
        verify(studentRepository).findStudentByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void getStudentByUsernameTest_whenUserNotFound() {
        //GIVEN
        when(studentRepository.findStudentByUsername("esgoet")).thenReturn(Optional.empty());
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //WHEN
                () -> studentService.getStudentByUsername("esgoet"));
        assertEquals("No student found with username: esgoet", thrown.getMessage());
    }

    @Test
    void deleteStudentTest() {
        //GIVEN
        doNothing().when(studentRepository).deleteById("1");
        //WHEN
        studentService.deleteStudent("1");
        //THEN
        verify(studentRepository).deleteById("1");
    }

}