package com.github.esgoet.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record Submission(
        String id,
        String studentId,
        String content,
        LocalDateTime timestamp
) {
}
