package com.github.esgoet.backend.service;

import com.github.esgoet.backend.model.Instructor;
import com.github.esgoet.backend.model.Student;
import com.github.esgoet.backend.model.AppUserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final StudentService studentService;
    private final InstructorService instructorService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String name;
        String password;
        String role;
        try {
            Student student = studentService.getStudentByUsername(username);
            name = student.username();
            password = student.password();
            role = AppUserRole.STUDENT.name();
        } catch (UsernameNotFoundException e) {
            Instructor instructor = instructorService.getInstructorByUsername(username);
            name = instructor.username();
            password = instructor.password();
            role = AppUserRole.INSTRUCTOR.name();
        }
        return new User(
                name,
                password,
                List.of(new SimpleGrantedAuthority(role)));
    }
}
