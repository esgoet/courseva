package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.InstructorResponseDto;
import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.InstructorUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.repository.InstructorRepository;
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
        InstructorResponseDto actual = instructorService.getInstructorById("1");
        //THEN
        InstructorResponseDto expected = new InstructorResponseDto("1","esgoet","esgoet@fakeemail.com", List.of());
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
        List<InstructorResponseDto> actual = instructorService.getAllInstructors();
        //THEN
        List<InstructorResponseDto> expected = List.of(new InstructorResponseDto("1","esgoet","esgoet@fakeemail.com", List.of()));
        verify(instructorRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getLoggedInInstructorTest() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        Instructor instructor = new Instructor("1", "esgoet", "esgoet@fakeemail.com", "123", List.of());
        when(instructorRepository.findInstructorByUsername("esgoet")).thenReturn(Optional.of(instructor));

        //WHEN
        InstructorResponseDto actual = instructorService.getLoggedInInstructor();

        // THEN
        InstructorResponseDto expected = new InstructorResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of());
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(instructorRepository).findInstructorByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void getLoggedInInstructorTest_whenUserNotKnown() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(instructorRepository.findInstructorByUsername("esgoet")).thenReturn(Optional.empty());

        // THEN
        assertThrows(UsernameNotFoundException.class,
                //WHEN
                () -> instructorService.getLoggedInInstructor());
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(instructorRepository).findInstructorByUsername("esgoet");
    }


    @Test
    void convertToInstructorResponseDtoTest() {
        //GIVEN
        Instructor instructor = new Instructor("1", "esgoet", "esgoet@fakeemail.com", "123", List.of());
        //WHEN
        InstructorResponseDto actual = instructorService.convertToInstructorResponseDto(instructor);
        // THEN
        InstructorResponseDto expected = new InstructorResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of());
        assertEquals(expected, actual);
    }

    @Test
    void updateInstructorTest_whenUserExists() {
        //GIVEN
        Instructor existingInstructor = new Instructor("1", "esgoet", "esgoet@fakeemail.com", "123", List.of("couseId-1"));
        InstructorUpdateDto updatedInstructorDto = new InstructorUpdateDto("esgoet", "esgoet@fakeemail.com",  List.of("courseId-1"));
        Instructor updatedInstructor = new Instructor("1", "esgoet", "esgoet@fakeemail.com", "123", List.of("courseId-1"));
        when(instructorRepository.findById("1")).thenReturn(Optional.of(existingInstructor));
        when(instructorRepository.save(updatedInstructor)).thenReturn(updatedInstructor);
        //WHEN
        InstructorResponseDto actual = instructorService.updateInstructor("1", updatedInstructorDto);
        // THEN
        InstructorResponseDto expected = new InstructorResponseDto("1", "esgoet", "esgoet@fakeemail.com",List.of("courseId-1"));
        verify(instructorRepository).findById("1");
        verify(instructorRepository).save(updatedInstructor);
        assertEquals(expected, actual);
    }


    @Test
    void updateInstructorTest_whenUserIsNotFound() {
        //GIVEN
        InstructorUpdateDto updatedInstructorDto = new InstructorUpdateDto("esgoet", "esgoet@fakeemail.com", List.of("courseId-1"));
        when(instructorRepository.findById("1")).thenReturn(Optional.empty());
        // THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> instructorService.updateInstructor("1",updatedInstructorDto));
        verify(instructorRepository).findById("1");
        verify(instructorRepository, never()).save(any());
        assertEquals("No instructor found with id: 1", thrown.getMessage());
    }

    @Test
    void getInstructorByUsernameTest() {
        //GIVEN
        Instructor instructor = new Instructor("1","esgoet","esgoet@fakeemail.com","123", List.of());
        when(instructorRepository.findInstructorByUsername("esgoet")).thenReturn(Optional.of(instructor));
        //WHEN
        Instructor actual = instructorService.getInstructorByUsername("esgoet");
        //THEN
        Instructor expected = new Instructor("1","esgoet","esgoet@fakeemail.com", "123", List.of());
        verify(instructorRepository).findInstructorByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void getInstructorByUsernameTest_whenUserNotFound() {
        //GIVEN
        when(instructorRepository.findInstructorByUsername("esgoet")).thenReturn(Optional.empty());
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //WHEN
                () -> instructorService.getInstructorByUsername("esgoet"));
        assertEquals("No instructor found with username: esgoet", thrown.getMessage());
    }
}