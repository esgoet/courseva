package com.github.esgoet.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@With
@Document("instructors")
public record Instructor(
        String id,
        String username,
        String email,
        String password,
        List<String> courses
) {
}
