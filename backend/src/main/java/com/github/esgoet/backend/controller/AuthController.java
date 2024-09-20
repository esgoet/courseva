package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.AppUserResponseDto;
import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AppUserService appUserService;

    @GetMapping("/me")
    public AppUserResponseDto getLoggedInUser() {
        return appUserService.getLoggedInAppUser();
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponseDto register(@RequestBody NewAppUserDto userDto) {
        return appUserService.createAppUser(userDto);
    }

    @GetMapping("/csrf")
    public CsrfToken getCsrfToken(CsrfToken csrfToken){
        return csrfToken;
    }

}
