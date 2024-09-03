package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.service.InstructorService;
import com.github.esgoet.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final StudentService studentService;
    private final InstructorService instructorService;

    @GetMapping("/me")
    public Object getUser(@AuthenticationPrincipal OAuth2User user) {
        String gitHubId = user.getName();
        try {
            return studentService.getStudentByGitHubId(gitHubId);
        } catch (UserNotFoundException e) {
            return instructorService.getInstructorByGitHubId(gitHubId);
        }
    }
}
