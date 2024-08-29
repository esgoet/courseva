package com.github.esgoet.backend.service;

import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IdServiceTest {
    private final CourseRepository courseRepository = mock(CourseRepository.class);
    private final IdService idService = new IdService(courseRepository);
    private final LocalDate startDate = LocalDate.of(2024, 8, 27);

    @Test
    void randomIdTest() {
        //GIVEN
        UUID uuid = UUID.randomUUID();
        try (MockedStatic<UUID> mockedUUID = mockStatic(UUID.class)) {
            mockedUUID.when(UUID::randomUUID).thenReturn(uuid);
            //WHEN
            String actual = idService.randomId();
            //THEN
            String expected = uuid.toString();
            mockedUUID.verify(UUID::randomUUID);
            assertEquals(expected, actual);
        }
    }

    @Test
    void generateCourseIdTest_whenIdDoesNotExistYet() {
        //GIVEN
        String title = "Math 101";
        when(courseRepository.existsById(anyString())).thenReturn(false);
        //WHEN
        String actual = idService.generateCourseId(title, startDate);
        //THEN
        String expected = "math-101-24-08-27-1";
        verify(courseRepository).existsById("math-101-24-08-27-1");
        assertEquals(expected, actual);
    }

    @Test
    void testGenerateCourseId_whenIdDoesAlreadyExist() {
        //GIVEN
        String title = "Math 101";
        when(courseRepository.existsById("math-101-24-08-27-1")).thenReturn(true);
        when(courseRepository.existsById("math-101-24-08-27-2")).thenReturn(false);

        //WHEN
        String actual = idService.generateCourseId(title, startDate);
        //THEN
        String expected = "math-101-24-08-27-2";
        verify(courseRepository).existsById("math-101-24-08-27-1");
        verify(courseRepository).existsById("math-101-24-08-27-2");
        assertEquals(expected, actual);
    }
}