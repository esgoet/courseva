package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Grade;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final IdService idService;
    private static final String USER_TYPE = "student";

    public Student createStudent() {
        Student student = new Student(idService.randomId(), new ArrayList<>(), new HashMap<>());
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id));
    }

    public Student updateStudent(String id, StudentUpdateDto updatedStudent) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id))
                .withCourses(updatedStudent.courses())
                .withGrades(updatedStudent.grades());
        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    public Student updateStudentGrades(String id, Map.Entry<String, Grade> grade) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id));

        Map<String, List<Grade>> allGrades = new HashMap<>(student.grades());
        List<Grade> courseGrades = allGrades.getOrDefault(grade.getKey(), new ArrayList<>());

        Optional<Grade> assignmentGrade = courseGrades.stream()
                .filter(g -> g.assignmentId().equals(grade.getValue().assignmentId()))
                .findFirst();
        if (assignmentGrade.isPresent()) {
            courseGrades = courseGrades.stream()
                    .map(g -> g.assignmentId().equals(grade.getValue().assignmentId()) ? grade.getValue() : g)
                    .toList();
        } else {
            courseGrades.add(grade.getValue());
        }
        allGrades.put(grade.getKey(), courseGrades);
        return studentRepository.save(student.withGrades(allGrades));
    }
}
