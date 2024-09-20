package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.AppUserResponseDto;
import com.github.esgoet.backend.dto.AppUserUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.*;
import com.github.esgoet.backend.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final IdService idService;
    private final StudentService studentService;
    private final InstructorService instructorService;
    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;
    private static final String USER_TYPE = "user";

    public AppUserResponseDto createAppUser(NewAppUserDto user) {
        AppUser appUser = new AppUser(
                idService.randomId(),
                user.email(),
                passwordEncoder.encode(user.password()),
                user.role().equals(AppUserRole.STUDENT) ? studentService.createStudent(user.username()) : null,
                user.role().equals(AppUserRole.INSTRUCTOR) ? instructorService.createInstructor(user.username()) : null
        );
        appUserRepository.save(appUser);
        return convertToAppUserResponseDto(appUser);
    }

    public AppUser getAppUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email).orElseThrow(()-> new UsernameNotFoundException("No user found with email: " + email));
    }

    public AppUserResponseDto getLoggedInAppUser() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        AppUser appUser = getAppUserByEmail(principal.getUsername());
        return convertToAppUserResponseDto(appUser);
    }

    public AppUserResponseDto updateAppUser(String id, AppUserUpdateDto updateDto) {
        AppUser appUser = appUserRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id))
                .withEmail(updateDto.email());
        return convertToAppUserResponseDto(appUserRepository.save(appUser));
    }

    public void deleteAppUser(String id) {
        AppUser appUser = appUserRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id));
        if (appUser.student() != null) studentService.deleteStudent(appUser.student().id());
        if (appUser.instructor() != null) instructorService.deleteInstructor(appUser.instructor().id());
        appUserRepository.deleteById(id);
    }

    public AppUserResponseDto convertToAppUserResponseDto (AppUser appUser) {
        return new AppUserResponseDto(appUser.id(),appUser.email(), appUser.student(), appUser.instructor()
        );
    }

}
