package com.github.esgoet.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@With
@Document("students")
public record Student(
        String id,
        List<String> courses,
        Map<String,List<Grade>> grades
) {
}
