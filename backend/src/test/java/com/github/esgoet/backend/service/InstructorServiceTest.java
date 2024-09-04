package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.InstructorResponseDto;
import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {
    private final InstructorRepository instructorRepository = mock(InstructorRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final InstructorService instructorService = new InstructorService(instructorRepository, idService, passwordEncoder);

    @Test
    void getInstructorByIdTest_whenInstructorExists() {
        //GIVEN
        Instructor instructor = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        when(instructorRepository.findById("1")).thenReturn(Optional.of(instructor));
        //WHEN
        Instructor actual = instructorService.getInstructorById("1");
        //THEN
        Instructor expected = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        verify(instructorRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getInstructorByIdTest_whenInstructorDoesNotExist() {
        //GIVEN
        when(instructorRepository.findById("1")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> instructorService.getInstructorById("1"));
        verify(instructorRepository).findById("1");
        assertEquals("No instructor found with id: 1", thrown.getMessage());
    }

    @Test
    void createInstructorTest() {
        //GIVEN
        NewAppUserDto newUser = new NewAppUserDto("esgoet", "esgoet@fakeemail.com","123", AppUserRole.INSTRUCTOR);
        Instructor newInstructor =  new Instructor("1","esgoet","esgoet@fakeemail.com","encodedPassword", List.of());
        when(idService.randomId()).thenReturn("1");
        when(passwordEncoder.encode("123")).thenReturn("encodedPassword");
        when(instructorRepository.save(newInstructor)).thenReturn(newInstructor);
        //WHEN
        InstructorResponseDto actual = instructorService.createInstructor(newUser);
        //THEN
        InstructorResponseDto expected = new InstructorResponseDto("1","esgoet","esgoet@fakeemail.com", List.of());
        verify(idService).randomId();
        verify(passwordEncoder).encode("123");
        verify(instructorRepository).save(newInstructor);
        assertEquals(expected, actual);
    }

    @Test
    void getAllInstructorsTest() {
        //GIVEN
        List<Instructor> instructors = List.of(new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of()));
        when(instructorRepository.findAll()).thenReturn(instructors);
        //WHEN
        List<Instructor> actual = instructorService.getAllInstructors();
        //THEN
        List<Instructor> expected = List.of(new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of()));
        verify(instructorRepository).findAll();
        assertEquals(expected, actual);
    }
}