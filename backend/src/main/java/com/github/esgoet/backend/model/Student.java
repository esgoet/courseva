package com.github.esgoet.backend.model;

import java.util.List;
import java.util.Map;

public record Student(
        String id,
        String username,
        String email,
        String gitHubId,
        List<String> courses,
        Map<String,List<Integer>> grades
) {
}
