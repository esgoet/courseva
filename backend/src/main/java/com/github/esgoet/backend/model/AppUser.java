package com.github.esgoet.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("users")
public record AppUser(
        String id,
        @Indexed(unique = true)
        String email,
        String password,
        @DBRef
        Student student,
        @DBRef
        Instructor instructor
) {
}
