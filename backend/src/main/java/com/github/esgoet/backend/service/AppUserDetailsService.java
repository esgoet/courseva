package com.github.esgoet.backend.service;

import com.github.esgoet.backend.model.AppUser;
import com.github.esgoet.backend.model.AppUserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserService appUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserService.getAppUserByUsername(username);
        String role = appUser.student() == null ? AppUserRole.INSTRUCTOR.name() : AppUserRole.STUDENT.name();
        return new User(
                appUser.username(),
                appUser.password(),
                List.of(new SimpleGrantedAuthority(role)));
    }
}
