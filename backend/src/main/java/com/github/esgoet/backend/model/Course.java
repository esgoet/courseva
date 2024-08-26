package com.github.esgoet.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("courses")
public record Course(
        String id,
        String name,
        String description,
        List<String> students,
        List<String> instructors
) {
}
