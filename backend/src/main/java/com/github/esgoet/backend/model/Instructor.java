package com.github.esgoet.backend.model;

import java.util.List;

public record Instructor(
        String id,
        String username,
        String email,
        String gitHubId,
        List<String> courses
) {
}
