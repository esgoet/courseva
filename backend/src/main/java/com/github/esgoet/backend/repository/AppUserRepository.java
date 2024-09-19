package com.github.esgoet.backend.repository;

import com.github.esgoet.backend.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AppUserRepository extends MongoRepository<AppUser, String> {
    Optional<AppUser> findAppUserByUsername(String username);
}
