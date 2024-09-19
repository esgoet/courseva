package com.github.esgoet.backend.repository;

import com.github.esgoet.backend.model.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends MongoRepository<Instructor, String> {
}
