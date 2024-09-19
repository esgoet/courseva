package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.AppUserResponseDto;
import com.github.esgoet.backend.dto.AppUserUpdateDto;
import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.AppUser;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserServiceTest {
    private final InstructorService instructorService = mock(InstructorService.class);
    private final StudentService studentService = mock(StudentService.class);
    private final IdService idService = mock(IdService.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);

    private final AppUserService appUserService = new AppUserService(idService,studentService,instructorService,passwordEncoder,appUserRepository);

    @Test
    void createAppUserTest_whenUserStudent() {
        //GIVEN
        NewAppUserDto userDto = new NewAppUserDto("esgoet","esgoet@fakeemail.com","123", AppUserRole.STUDENT);
        Student student = new Student("s1",new ArrayList<>(), new HashMap<>());
        AppUser appUser = new AppUser("1", "esgoet", "esgoet@fakeemail.com","encodedPassword", student, null);

        when(idService.randomId()).thenReturn("1");
        when(passwordEncoder.encode("123")).thenReturn("encodedPassword");
        when(studentService.createStudent()).thenReturn(student);
        when(appUserRepository.save(appUser)).thenReturn(appUser);
        //WHEN
        AppUserResponseDto actual = appUserService.createAppUser(userDto);
        //THEN
        AppUserResponseDto expected = new AppUserResponseDto("1", "esgoet", "esgoet@fakeemail.com", student, null);
        verify(idService).randomId();
        verify(passwordEncoder).encode("123");
        verify(studentService).createStudent();
        verify(appUserRepository).save(appUser);
        verify(instructorService, never()).createInstructor();
        assertEquals(expected, actual);
    }

    @Test
    void createAppUserTest_whenUserInstructor() {
        //GIVEN
        NewAppUserDto userDto = new NewAppUserDto("esgoet","esgoet@fakeemail.com","123", AppUserRole.INSTRUCTOR);
        Instructor instructor = new Instructor("i1",new ArrayList<>());
        AppUser appUser = new AppUser("1", "esgoet", "esgoet@fakeemail.com","encodedPassword", null, instructor);

        when(idService.randomId()).thenReturn("1");
        when(passwordEncoder.encode("123")).thenReturn("encodedPassword");
        when(instructorService.createInstructor()).thenReturn(instructor);
        when(appUserRepository.save(appUser)).thenReturn(appUser);
        //WHEN
        AppUserResponseDto actual = appUserService.createAppUser(userDto);
        //THEN
        AppUserResponseDto expected = new AppUserResponseDto("1", "esgoet", "esgoet@fakeemail.com",  null, instructor);
        verify(idService).randomId();
        verify(passwordEncoder).encode("123");
        verify(instructorService).createInstructor();
        verify(appUserRepository).save(appUser);
        verify(studentService, never()).createStudent();
        assertEquals(expected, actual);
    }

    @Test
    void getAppUserByUsernameTest_whenUserExists() {
        //GIVEN
        AppUser appUser = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        when(appUserRepository.findAppUserByUsername("esgoet")).thenReturn(Optional.of(appUser));
        //WHEN
        AppUser actual = appUserService.getAppUserByUsername("esgoet");
        //THEN
        AppUser expected = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        verify(appUserRepository).findAppUserByUsername("esgoet");
        assertEquals(expected,actual);
    }

    @Test
    void getAppUserByUsernameTest_whenUserNotFound() {
        //GIVEN
        when(appUserRepository.findAppUserByUsername("esgoet")).thenReturn(Optional.empty());
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //WHEN
                () -> appUserService.getAppUserByUsername("esgoet"));
        assertEquals("No user found with username: esgoet", thrown.getMessage());
    }

    @Test
    void getLoggedInAppUserTest_whenUserExists() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        AppUser appUser = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        when(appUserRepository.findAppUserByUsername("esgoet")).thenReturn(Optional.of(appUser));
        //WHEN
        AppUserResponseDto actual = appUserService.getLoggedInAppUser();
        //THEN
        AppUserResponseDto expected = new AppUserResponseDto("1","esgoet","esgoet@fakeemail.com", new Student("s1", List.of(),new HashMap<>()), null);
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(appUserRepository).findAppUserByUsername("esgoet");
        assertEquals(expected,actual);

    }

    @Test
    void getLoggedInAppUserTest_whenUserNotKnown() {
        //GIVEN
        User user = new User("esgoet", "123", List.of());
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(appUserRepository.findAppUserByUsername("esgoet")).thenReturn(Optional.empty());
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //WHEN
                appUserService::getLoggedInAppUser);
        verify(authentication).getPrincipal();
        verify(securityContext).getAuthentication();
        verify(appUserRepository).findAppUserByUsername("esgoet");
        assertEquals("No user found with username: esgoet", thrown.getMessage());
    }

    @Test
    void updateAppUserTest_whenUserExists() {
        //GIVEN
        AppUser appUser = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        AppUserUpdateDto updateDto = new AppUserUpdateDto("esgoet","esgoet@updatedemail.com");
        AppUser updatedAppUser = new AppUser("1","esgoet","esgoet@updatedemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        when(appUserRepository.findById("1")).thenReturn(Optional.of(appUser));
        when(appUserRepository.save(updatedAppUser)).thenReturn(updatedAppUser);
        //WHEN
        AppUserResponseDto actual = appUserService.updateAppUser("1",updateDto);
        //THEN
        AppUserResponseDto expected = new AppUserResponseDto("1","esgoet","esgoet@updatedemail.com", new Student("s1", List.of(),new HashMap<>()), null);
        verify(appUserRepository).findById("1");
        verify(appUserRepository).save(updatedAppUser);
        assertEquals(expected,actual);
    }

    @Test
    void updateAppUserTest_whenUserNotFound() {
        //GIVEN
        AppUserUpdateDto updateDto = new AppUserUpdateDto("esgoet","esgoet@updatedemail.com");
        when(appUserRepository.findById("1")).thenReturn(Optional.empty());
        //THEN
        UserNotFoundException thrown = assertThrows(UserNotFoundException.class,
                //WHEN
                () -> appUserService.updateAppUser("1",updateDto));
        verify(appUserRepository).findById("1");
        verify(appUserRepository,never()).save(any(AppUser.class));
        assertEquals("No user found with id: 1", thrown.getMessage());
    }

    @Test
    void deleteAppUserTest() {
        //GIVEN
        AppUser appUser = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        when(appUserRepository.findById("1")).thenReturn(Optional.of(appUser));
        doNothing().when(studentService).deleteStudent("s1");
        doNothing().when(appUserRepository).deleteById("1");
        //WHEN
        appUserService.deleteAppUser("1");
        //THEN
        verify(studentService).deleteStudent("s1");
        verify(instructorService, never()).deleteInstructor(anyString());
        verify(appUserRepository).deleteById("1");
    }

    @Test
    void convertToAppUserResponseDtoTest() {
        //GIVEN
        AppUser appUser = new AppUser("1","esgoet","esgoet@fakeemail.com","encodedPassword", new Student("s1", List.of(),new HashMap<>()), null);
        //WHEN
        AppUserResponseDto actual = appUserService.convertToAppUserResponseDto(appUser);
        //THEN
        AppUserResponseDto expected = new AppUserResponseDto("1","esgoet","esgoet@fakeemail.com", new Student("s1", List.of(),new HashMap<>()), null);
        assertEquals(expected,actual);
    }
}