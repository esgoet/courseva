package com.github.esgoet.backend.dto;

import java.time.LocalDateTime;

public record LessonDto(
        String title,
        String content,
        LocalDateTime whenPublic
) {
}
