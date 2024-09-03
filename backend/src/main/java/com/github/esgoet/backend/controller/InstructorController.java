package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.service.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorService instructorService;

    @GetMapping
    public List<Instructor> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{githubId}")
    public Instructor getInstructor(@PathVariable String githubId) {
        return instructorService.getInstructorByGitHubId(githubId);
    }

    @PostMapping
    public Instructor createInstructor(@RequestBody NewUserDto user) {
        return instructorService.createInstructor(user);
    }
}
