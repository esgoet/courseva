package com.github.esgoet.backend.dto;

import java.util.List;
import java.util.Map;

public record StudentUpdateDto(
        String username,
        String email,
        String password,
        List<String> courses,
        Map<String,List<Integer>> grades
) {
}
