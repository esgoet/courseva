package com.github.esgoet.backend.model;

import java.time.LocalDateTime;

public record Submission(
        String id,
        String studentId,
        String content,
        LocalDateTime timestamp
) {
}
