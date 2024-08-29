package com.github.esgoet.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record NewCourseDto(
        String title,
        String description,
        List<String> students,
        List<String> instructors,
        LocalDate startDate
) {
}
