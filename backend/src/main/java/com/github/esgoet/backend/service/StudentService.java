package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final IdService idService;

    public Student getStudentByGitHubId(String githubId) {
        return studentRepository.findByGitHubId(githubId).orElseThrow(()-> new UserNotFoundException("No user found with GitHub Id: " + githubId));
    }

    public Student createStudent(NewUserDto user) {
        return new Student(idService.randomId(), user.username(), user.email(), user.gitHubId(), List.of(), new HashMap<>());
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    public Student getStudentById(String id) {
        return studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException("No student found with id: " + id));
    }
}
