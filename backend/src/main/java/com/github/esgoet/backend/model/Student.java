package com.github.esgoet.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document("students")
public record Student(
        String id,
        String username,
        String email,
        String gitHubId,
        List<String> courses,
        Map<String,List<Integer>> grades
) {
}
