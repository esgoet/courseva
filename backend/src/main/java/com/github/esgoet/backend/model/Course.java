package com.github.esgoet.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@With
@Document("courses")
public record Course(
        String id,
        String title,
        String description,
        List<Lesson> lessons,
        List<Assignment> assignments,
        List<String> students,
        List<String> instructors,
        LocalDate startDate
) {
}
