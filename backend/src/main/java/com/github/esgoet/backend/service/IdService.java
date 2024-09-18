package com.github.esgoet.backend.service;

import com.github.esgoet.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IdService {
    private final CourseRepository courseRepository;

    public String randomId() {
        return UUID.randomUUID().toString();
    }

    public String generateCourseId(String title) {
        String timestamp = String.valueOf(Instant.now().hashCode()).substring(1);
        String id = title.toLowerCase().replace(" ", "-") + "-";
        boolean isUnique = false;
        while (!isUnique) {
            if (!courseRepository.existsById(id + timestamp)) {
                isUnique = true;
            } else {
                timestamp = String.valueOf(Instant.now().hashCode()).substring(1);
            }
        }
        return id + timestamp;

    }
}
