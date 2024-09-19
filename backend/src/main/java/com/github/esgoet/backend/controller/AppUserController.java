package com.github.esgoet.backend.controller;

import com.github.esgoet.backend.dto.AppUserResponseDto;
import com.github.esgoet.backend.dto.AppUserUpdateDto;
import com.github.esgoet.backend.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PutMapping("/{id}")
    public AppUserResponseDto updateAppUser(@PathVariable String id, @RequestBody AppUserUpdateDto updateDto) {
        return appUserService.updateAppUser(id, updateDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppUser(@PathVariable String id) {
        appUserService.deleteAppUser(id);
    }
}
