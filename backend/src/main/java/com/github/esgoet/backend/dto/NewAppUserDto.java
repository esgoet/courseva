package com.github.esgoet.backend.dto;

import com.github.esgoet.backend.model.AppUserRole;

public record NewAppUserDto(
        String username,
        String email,
        String password,
        AppUserRole role
) {
}
