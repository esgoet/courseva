package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.model.Grade;

import java.util.List;
import java.util.Map;

public record StudentUpdateDto(
        String username,
        String email,
        List<String> courses,
        Map<String,List<Grade>> grades
) {
}
