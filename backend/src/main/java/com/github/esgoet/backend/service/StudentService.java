package com.github.esgoet.backend.service;

import com.github.esgoet.backend.dto.NewAppUserDto;
import com.github.esgoet.backend.dto.StudentResponseDto;
import com.github.esgoet.backend.dto.StudentUpdateDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.model.Grade;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;
    private static final String USER_TYPE = "student";

    public StudentResponseDto createStudent(NewAppUserDto user) {
        Student student = new Student(idService.randomId(), user.username(), user.email(), passwordEncoder.encode(user.password()), List.of(), new HashMap<>());
        studentRepository.save(student);
        return new StudentResponseDto(student.id(),student.username(), student.email(), student.courses(), student.grades());
    }

    public List<StudentResponseDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(this::convertToStudentResponseDto).toList();
    }


    public StudentResponseDto getStudentById(String id) {
        return convertToStudentResponseDto(studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id)));
    }

    public Student getStudentByUsername(String username) {
        return studentRepository.findStudentByUsername(username).orElseThrow(()-> new UsernameNotFoundException("No student found with username: " + username));
    }

    public StudentResponseDto getLoggedInStudent() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Student student = getStudentByUsername(principal.getUsername());
        return new StudentResponseDto(student.id(),student.username(), student.email(), student.courses(), student.grades());
    }

    public StudentResponseDto convertToStudentResponseDto (Student student) {
        return new StudentResponseDto(student.id(),student.username(),student.email(),student.courses(),student.grades());
    }

    public StudentResponseDto updateStudent(String id, StudentUpdateDto updatedStudent) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id))
                .withUsername(updatedStudent.username())
                .withEmail(updatedStudent.email())
                .withCourses(updatedStudent.courses())
                .withGrades(updatedStudent.grades());
        return convertToStudentResponseDto(studentRepository.save(student));
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    public StudentResponseDto updateStudentGrades(String id, Map.Entry<String, Grade> grade) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new UserNotFoundException(USER_TYPE, id));
        Map<String, List<Grade>> currentGrades = new HashMap<>(student.grades());
        List<Grade> gradeList = currentGrades.getOrDefault(grade.getKey(), new ArrayList<>());
        Optional<Grade> existingGrade = gradeList.stream()
                .filter(g -> g.assignmentId().equals(grade.getValue().assignmentId()))
                .findFirst();
        if (existingGrade.isPresent()) {
            gradeList = gradeList.stream().map(g -> g.assignmentId().equals(grade.getValue().assignmentId()) ? grade.getValue() : g).toList();
        } else {
            gradeList.add(grade.getValue());
        }
        currentGrades.put(grade.getKey(), gradeList);
        return convertToStudentResponseDto(studentRepository.save(student.withGrades(currentGrades)));
    }
}
