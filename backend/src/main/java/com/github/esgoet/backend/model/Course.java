package com.github.esgoet.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

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
