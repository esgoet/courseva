package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/{githubId}")
    public Student getStudent(@PathVariable String githubId) {
        return studentService.getStudentByGitHubId(githubId);
    }

    @PostMapping
    public Student createStudent(@RequestBody NewUserDto user) {
        return studentService.createStudent(user);
    }
}
