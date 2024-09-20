package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.InstructorUpdateDto;
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

    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable String id) {
        return instructorService.getInstructorById(id);
    }

    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable String id, @RequestBody InstructorUpdateDto updatedInstructor) {
        return instructorService.updateInstructor(id, updatedInstructor);
    }

}
