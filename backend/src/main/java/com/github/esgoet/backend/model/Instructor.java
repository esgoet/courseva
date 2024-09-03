package com.github.esgoet.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("instructors")
public record Instructor(
        String id,
        String username,
        String email,
        String gitHubId,
        List<String> courses
) {
}
