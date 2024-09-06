package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.StudentResponseDto;
import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<StudentResponseDto> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentResponseDto getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public StudentResponseDto createStudent(@RequestBody NewAppUserDto user) {
        return studentService.createStudent(user);
    }

    @PutMapping("/{id}")
    public StudentResponseDto updateStudent(@PathVariable String id, @RequestBody StudentUpdateDto updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
    }
}
