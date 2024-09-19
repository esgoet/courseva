package com.github.esgoet.backend.service;

import com.github.esgoet.backend.model.AppUser;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserDetailsServiceTest {
    private final AppUserService appUserService = mock(AppUserService.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserService);

    @Test
    void loadUserByUsernameTest_whenUserStudent() {
        //GIVEN
        AppUser appUser = new AppUser("1", "esgoet", "esgoet@fakeemail.com","123", new Student("s1", List.of(), new HashMap<>()), null);
        when(appUserService.getAppUserByUsername("esgoet")).thenReturn(appUser);
        //WHEN
        UserDetails actual = appUserDetailsService.loadUserByUsername("esgoet");
        //THEN
        UserDetails expected = new User("esgoet","123",List.of(new SimpleGrantedAuthority(AppUserRole.STUDENT.name())));
        verify(appUserService).getAppUserByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsernameTest_whenUserInstructor() {
        //GIVEN
        AppUser appUser = new AppUser("1", "esgoet", "esgoet@fakeemail.com","123", null, new Instructor("i1",new ArrayList<>()));
        when(appUserService.getAppUserByUsername("esgoet")).thenReturn(appUser);
        //WHEN
        UserDetails actual = appUserDetailsService.loadUserByUsername("esgoet");
        //THEN
        UserDetails expected = new User("esgoet","123",List.of(new SimpleGrantedAuthority(AppUserRole.INSTRUCTOR.name())));
        verify(appUserService).getAppUserByUsername("esgoet");
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsernameTest_whenUserNotFound() {
        //GIVEN
        when(appUserService.getAppUserByUsername("esgoet")).thenThrow(new UsernameNotFoundException("No user found with username: esgoet"));
        //THEN
        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                //THEN
                () -> appUserDetailsService.loadUserByUsername("esgoet"));
        verify(appUserService).getAppUserByUsername("esgoet");
        assertEquals("No user found with username: esgoet", thrown.getMessage());
    }
}