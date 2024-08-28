package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.model.Assignment;
import java.time.LocalDate;
import java.util.List;

public record UpdateCourseDto(
        String title,
        String description,
        List<LessonDto> lessons,
        List<Assignment> assignments,
        List<String> students,
        List<String> instructors,
        LocalDate startDate
) {
}
