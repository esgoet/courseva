package com.github.esgoet.backend.dto;

import java.util.List;
import java.util.Map;

public record StudentResponseDto(
        String id,
        String username,
        String email,
        List<String> courses,
        Map<String,List<Integer>> grades
) {
}
