package com.github.esgoet.backend.model;

import lombok.With;

import java.time.LocalDateTime;

@With
public record Lesson(
        String id,
        String title,
        String content,
        LocalDateTime whenPublic
) {
}
