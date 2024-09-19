package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import org.springframework.data.mongodb.core.mapping.DBRef;

public record AppUserResponseDto(
        String id,
        String username,
        String email,
        @DBRef
        Student student,
        @DBRef
        Instructor instructor
) {
}
