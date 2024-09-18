package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.model.AppUserRole;
import com.github.esgoet.backend.service.InstructorService;
import com.github.esgoet.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final StudentService studentService;
    private final InstructorService instructorService;

    @GetMapping("/me")
    public Object getLoggedInUser() {
        try {
            return studentService.getLoggedInStudent();
        } catch (UsernameNotFoundException e) {
            return instructorService.getLoggedInInstructor();
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Object register(@RequestBody NewAppUserDto userDto) {
        if (userDto.role().equals(AppUserRole.STUDENT)) {
            return studentService.createStudent(userDto);
        }
        return instructorService.createInstructor(userDto);
    }

    @GetMapping("/csrf")
    public CsrfToken getCsrfToken(CsrfToken csrfToken){
        return csrfToken;
    }

}
