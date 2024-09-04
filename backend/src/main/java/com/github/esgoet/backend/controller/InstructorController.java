package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.InstructorResponseDto;
import com.github.esgoet.backend.dto.NewAppUserDto;
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
    public List<InstructorResponseDto> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public InstructorResponseDto getInstructorById(@PathVariable String id) {
        return instructorService.getInstructorById(id);
    }

    @PostMapping
    public InstructorResponseDto createInstructor(@RequestBody NewAppUserDto user) {
        return instructorService.createInstructor(user);
    }
}
