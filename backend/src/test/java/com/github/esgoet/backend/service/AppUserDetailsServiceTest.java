package com.github.esgoet.backend.service;

import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserDetailsServiceTest {
    private final StudentService studentService = mock(StudentService.class);
    private final InstructorService instructorService = mock(InstructorService.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(studentService, instructorService);

    @Test
    void loadUserByUsername_whenStudentExistsWithUsername() {
        //GIVEN
        Student student = new Student("1","esgoet","esgoet@fakeemail.com","123", List.of(), new HashMap<>());
        when(studentService.getStudentByUsername("esgoet")).thenReturn(student);
        //WHEN
        UserDetails actual = appUserDetailsService.loadUserByUsername("esgoet");
        //THEN
        UserDetails expected = new User("esgoet","123",List.of(new SimpleGrantedAuthority(AppUserRole.STUDENT.name())));
        verify(studentService).getStudentByUsername("esgoet");
        verify(instructorService, never()).getInstructorByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_whenInstructorExistsWithUsername() {
        //GIVEN
        Instructor instructor = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        when(studentService.getStudentByUsername("esgoet")).thenThrow(new UsernameNotFoundException("No student found with username: esgoet"));
        when(instructorService.getInstructorByUsername("esgoet")).thenReturn(instructor);
        //WHEN
        UserDetails actual = appUserDetailsService.loadUserByUsername("esgoet");
        //THEN
        UserDetails expected = new User("esgoet","123",List.of(new SimpleGrantedAuthority(AppUserRole.INSTRUCTOR.name())));
        verify(studentService).getStudentByUsername("esgoet");
        verify(instructorService).getInstructorByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_whenNoUserExistsWithUsername() {
        //GIVEN
        when(studentService.getStudentByUsername("esgoet")).thenThrow(new UsernameNotFoundException("No student found with username: esgoet"));
        when(instructorService.getInstructorByUsername("esgoet")).thenThrow(new UsernameNotFoundException("No instructor found with username: esgoet"));
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //THEN
                () -> appUserDetailsService.loadUserByUsername("esgoet"));
        verify(studentService).getStudentByUsername("esgoet");
        verify(instructorService).getInstructorByUsername("esgoet");
        assertEquals("No instructor found with username: esgoet", thrown.getMessage());
    }
}