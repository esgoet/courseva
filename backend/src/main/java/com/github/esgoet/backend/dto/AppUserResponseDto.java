package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

public record AppUserResponseDto(
        String id,
        @Indexed(unique = true)
        String email,
        @DBRef
        Student student,
        @DBRef
        Instructor instructor
) {
}
