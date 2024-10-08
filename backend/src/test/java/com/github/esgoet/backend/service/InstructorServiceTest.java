package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.InstructorUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {
    private final InstructorRepository instructorRepository = mock(InstructorRepository.class);
    private final IdService idService = mock(IdService.class);
    private final InstructorService instructorService = new InstructorService(instructorRepository, idService);

    @Test
    void getInstructorByIdTest_whenInstructorExists() {
        //GIVEN
        Instructor instructor = new Instructor("i-1", "esgoet", new ArrayList<>());
        when(instructorRepository.findById("i-1")).thenReturn(Optional.of(instructor));
        //WHEN
        Instructor actual = instructorService.getInstructorById("i-1");
        //THEN
        Instructor expected = new Instructor("i-1", "esgoet", new ArrayList<>());
        verify(instructorRepository).findById("i-1");
        assertEquals(expected, actual);
    }

    @Test
    void getInstructorByIdTest_whenInstructorNotFound() {
        //GIVEN
        when(instructorRepository.findById("i-1")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> instructorService.getInstructorById("i-1"));
        verify(instructorRepository).findById("i-1");
        assertEquals("No instructor found with id: i-1", thrown.getMessage());
    }

    @Test
    void createInstructorTest() {
        //GIVEN
        Instructor instructor =  new Instructor("i-1", "esgoet", new ArrayList<>());
        when(idService.randomId()).thenReturn("1");
        when(instructorRepository.save(instructor)).thenReturn(instructor);
        //WHEN
        Instructor actual = instructorService.createInstructor("esgoet");
        //THEN
        Instructor expected = new Instructor("i-1", "esgoet", new ArrayList<>());
        verify(idService).randomId();
        verify(instructorRepository).save(instructor);
        assertEquals(expected, actual);
    }

    @Test
    void getAllInstructorsTest() {
        //GIVEN
        List<Instructor> instructors = List.of(new Instructor("i-1", "esgoet", new ArrayList<>()));
        when(instructorRepository.findAll()).thenReturn(instructors);
        //WHEN
        List<Instructor> actual = instructorService.getAllInstructors();
        //THEN
        List<Instructor> expected = List.of(new Instructor("i-1", "esgoet", new ArrayList<>()));
        verify(instructorRepository).findAll();
        assertEquals(expected, actual);
    }


    @Test
    void updateInstructorTest_whenInstructorExists() {
        //GIVEN
        Instructor existingInstructor = new Instructor("i-1", "esgoet", List.of());
        InstructorUpdateDto updatedInstructorDto = new InstructorUpdateDto("esgoet", List.of("courseId-1"));
        Instructor updatedInstructor = new Instructor("i-1", "esgoet", List.of("courseId-1"));
        when(instructorRepository.findById("i-1")).thenReturn(Optional.of(existingInstructor));
        when(instructorRepository.save(updatedInstructor)).thenReturn(updatedInstructor);
        //WHEN
        Instructor actual = instructorService.updateInstructor("i-1", updatedInstructorDto);
        // THEN
        Instructor expected = new Instructor("i-1", "esgoet", List.of("courseId-1"));
        verify(instructorRepository).findById("i-1");
        verify(instructorRepository).save(updatedInstructor);
        assertEquals(expected, actual);
    }


    @Test
    void updateInstructorTest_whenInstructorNotFound() {
        //GIVEN
        InstructorUpdateDto updatedInstructorDto = new InstructorUpdateDto("esgoet", List.of("courseId-1"));
        when(instructorRepository.findById("i-1")).thenReturn(Optional.empty());
        // THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> instructorService.updateInstructor("i-1",updatedInstructorDto));
        verify(instructorRepository).findById("i-1");
        verify(instructorRepository, never()).save(any());
        assertEquals("No instructor found with id: i-1", thrown.getMessage());
    }


    @Test
    void deleteInstructorTest() {
        //GIVEN
        doNothing().when(instructorRepository).deleteById("i-1");
        //WHEN
        instructorService.deleteInstructor("i-1");
        //THEN
        verify(instructorRepository).deleteById("i-1");
    }
}