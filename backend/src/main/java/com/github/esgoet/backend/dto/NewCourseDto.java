package com.github.esgoet.backend.dto;

import java.util.List;

public record NewCourseDto(
        String title,
        String description,
        List<String> students,
        List<String> instructors
) {
}
