package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.InstructorUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {
    private final InstructorRepository instructorRepository;
    private final IdService idService;
    private static final String USER_TYPE = "instructor";

    public Instructor createInstructor(String username) {
        Instructor instructor = new Instructor(idService.randomId(), username, new ArrayList<>());
        return instructorRepository.save(instructor);
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor getInstructorById(String id) {
        return instructorRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id));
    }

    public Instructor updateInstructor(String id, InstructorUpdateDto updateDto) {
        Instructor instructor = instructorRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id))
                .withUsername(updateDto.username())
                .withCourses(updateDto.courses());
        return instructorRepository.save(instructor);
    }

    public void deleteInstructor(String id) {
        instructorRepository.deleteById(id);
    }
}
