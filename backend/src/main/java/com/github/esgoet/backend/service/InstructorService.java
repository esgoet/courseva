package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.InstructorResponseDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {
    private final InstructorRepository instructorRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;

    public InstructorResponseDto createInstructor(NewAppUserDto user) {
        Instructor instructor = new Instructor(idService.randomId(), user.username(), user.email(), passwordEncoder.encode(user.password()), List.of());
        instructorRepository.save(instructor);
        return new InstructorResponseDto(instructor.id(),instructor.username(), instructor.email(), instructor.courses());
    }

    public List<InstructorResponseDto> getAllInstructors() {
        return instructorRepository.findAll().stream().map(this::convertToInstructorResponseDto).toList();
    }


    public InstructorResponseDto getInstructorById(String id) {
        return convertToInstructorResponseDto(instructorRepository.findById(id).orElseThrow(()-> new UserNotFoundException("No instructor found with id: " + id)));
    }

    public Instructor getInstructorByUsername(String username) {
        return instructorRepository.findInstructorByUsername(username).orElseThrow(()-> new UsernameNotFoundException("No instructor found with username: " + username));
    }

    public InstructorResponseDto getLoggedInInstructor() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Instructor instructor = getInstructorByUsername(principal.getUsername());
        return new InstructorResponseDto(instructor.id(),instructor.username(), instructor.email(), instructor.courses());
    }

    public InstructorResponseDto convertToInstructorResponseDto (Instructor instructor) {
        return new InstructorResponseDto(instructor.id(),instructor.username(),instructor.email(),instructor.courses());
    }

}
