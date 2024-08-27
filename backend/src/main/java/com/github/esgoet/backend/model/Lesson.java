package com.github.esgoet.backend.model;

import java.time.LocalDateTime;

public record Lesson(
        String id,
        String title,
        String content,
        LocalDateTime whenPublic
) {
}
