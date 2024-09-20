package com.github.esgoet.backend.service;

import com.github.esgoet.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.time.Instant;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IdServiceTest {
    private final CourseRepository courseRepository = mock(CourseRepository.class);
    private final IdService idService = new IdService(courseRepository);

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
        Instant instant = Instant.now();
        String timestamp = String.valueOf(instant.hashCode()).substring(1);
        try (MockedStatic<Instant> mockedInstant = mockStatic(Instant.class)) {
            mockedInstant.when(Instant::now).thenReturn(instant);
            when(courseRepository.existsById(anyString())).thenReturn(false);
            //WHEN
            String actual = idService.generateCourseId(title);
            //THEN
            String expected = "math-101-" + timestamp;
            mockedInstant.verify(Instant::now);
            verify(courseRepository).existsById("math-101-"+timestamp);
            assertEquals(expected, actual);
        }
    }

    @Test
    void testGenerateCourseId_whenIdDoesAlreadyExist() {
        //GIVEN
        String title = "Math 101";
        Instant instant1 = Instant.now();
        Instant instant2 = Instant.now();
        String timestamp1 = String.valueOf(instant1.hashCode()).substring(1);
        String timestamp2 = String.valueOf(instant2.hashCode()).substring(1);

        try (MockedStatic<Instant> mockedInstant = mockStatic(Instant.class)) {
            mockedInstant.when(Instant::now).thenReturn(instant1, instant2);
            when(courseRepository.existsById("math-101-" + timestamp1)).thenReturn(true);
            when(courseRepository.existsById("math-101-" + timestamp2)).thenReturn(false);
            //WHEN
            String actual = idService.generateCourseId(title);
            //THEN
            String expected = "math-101-" + timestamp2;
            mockedInstant.verify(Instant::now, times(2));
            verify(courseRepository).existsById("math-101-" + timestamp1);
            verify(courseRepository).existsById("math-101-" + timestamp2);
            assertEquals(expected, actual);
        }
    }
}