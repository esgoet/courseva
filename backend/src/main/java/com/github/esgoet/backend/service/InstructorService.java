package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {
    private final InstructorRepository instructorRepository;
    private final IdService idService;

    public Instructor getInstructorByGitHubId(String githubId) {
        return instructorRepository.findByGitHubId(githubId).orElseThrow(()-> new UserNotFoundException("No user found with GitHub Id: " + githubId));
    }

    public Instructor createInstructor(NewUserDto user) {
        return new Instructor(idService.randomId(), user.username(), user.email(), user.gitHubId(), List.of());
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }
}
