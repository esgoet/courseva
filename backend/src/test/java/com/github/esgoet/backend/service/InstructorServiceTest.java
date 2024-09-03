package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {
    private final InstructorRepository instructorRepository = mock(InstructorRepository.class);
    private final IdService idService = mock(IdService.class);
    private final InstructorService instructorService = new InstructorService(instructorRepository, idService);

    @Test
    void getInstructorByGitHubIdTest_whenInstructorExists() {
        //GIVEN
        Instructor instructor = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        when(instructorRepository.findByGitHubId("123")).thenReturn(Optional.of(instructor));
        //WHEN
        Instructor actual = instructorService.getInstructorByGitHubId("123");
        //THEN
        Instructor expected = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        verify(instructorRepository).findByGitHubId("123");
        assertEquals(expected, actual);
    }

    @Test
    void getInstructorByGitHubIdTest_whenInstructorDoesNotExist() {
        //GIVEN
        when(instructorRepository.findByGitHubId("123")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> instructorService.getInstructorByGitHubId("123"));
        verify(instructorRepository).findByGitHubId("123");
        assertEquals("No instructor found with GitHub Id: 123", thrown.getMessage());
    }

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
        NewUserDto newUser = new NewUserDto("esgoet", "esgoet@fakeemail.com","123");
        Instructor newInstructor =  new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        when(idService.randomId()).thenReturn("1");
        when(instructorRepository.save(newInstructor)).thenReturn(newInstructor);
        //WHEN
        Instructor actual = instructorService.createInstructor(newUser);
        //THEN
        Instructor expected = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        verify(idService).randomId();
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