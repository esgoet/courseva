package com.github.esgoet.backend.model;

import lombok.With;

import java.time.LocalDateTime;
import java.util.List;

@With
public record Assignment(
        String id,
        String title,
        String description,
        LocalDateTime whenPublic,
        LocalDateTime deadline,
        List<Submission> submissions
) {
}
