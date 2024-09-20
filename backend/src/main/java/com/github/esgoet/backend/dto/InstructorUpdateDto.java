package com.github.esgoet.backend.dto;

import java.util.List;

public record InstructorUpdateDto(
        String username,
        List<String> courses
) {
}
