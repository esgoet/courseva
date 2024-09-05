package com.github.esgoet.backend.dto;

import java.util.List;

public record InstructorResponseDto(
        String id,
        String username,
        String email,
        List<String> courses
) {
}
