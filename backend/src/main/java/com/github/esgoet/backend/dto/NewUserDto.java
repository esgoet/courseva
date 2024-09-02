package com.github.esgoet.backend.dto;

public record NewUserDto(
        String username,
        String email,
        String gitHubId
) {
}
