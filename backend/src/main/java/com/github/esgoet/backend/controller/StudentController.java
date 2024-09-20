package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.model.Grade;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id, @RequestBody StudentUpdateDto updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    @PutMapping("/{id}/grades")
    public Student updateStudentGrades(@PathVariable String id, @RequestBody Map.Entry<String,Grade> grade) {
        return studentService.updateStudentGrades(id, grade);
    }

}
