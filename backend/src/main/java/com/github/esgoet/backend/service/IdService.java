package com.github.esgoet.backend.service;

import com.github.esgoet.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IdService {
    // use courseRepo instead
    private final CourseRepository courseRepository;

    public String randomId() {
        return UUID.randomUUID().toString();
    }

    public String generateCourseId(String title, LocalDate startTime) {
        int cycle = 1;
        String id = title.toLowerCase().replace(" ", "-") + "-" + startTime.toString().substring(2) + "-";
        boolean isUnique = false;
        while (!isUnique) {
            if (!courseRepository.existsById(id + cycle)) {
                isUnique = true;
            } else {
                cycle += 1;
            }
        }
        return id + cycle;

    }
}
