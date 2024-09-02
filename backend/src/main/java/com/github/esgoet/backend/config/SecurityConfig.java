package com.github.esgoet.backend.config;

import com.github.esgoet.backend.dto.NewUserDto;
import com.github.esgoet.backend.exception.UserNotFoundException;
import com.github.esgoet.backend.service.InstructorService;
import com.github.esgoet.backend.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    private final HttpServletRequest httpServletRequest;
    private final StudentService studentService;
    private final InstructorService instructorService;

    private static final String INSTRUCTOR_ROLE = "INSTRUCTOR";
    private static final String STUDENT_ROLE = "STUDENT";

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
                        .requestMatchers(HttpMethod.POST,"/api/courses").hasAuthority(INSTRUCTOR_ROLE)
                        .requestMatchers(HttpMethod.DELETE, "/api/course/**").hasAuthority(INSTRUCTOR_ROLE)
                        .requestMatchers("/api/courses/**").authenticated()
                        .anyRequest().permitAll()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl));
        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        return request -> {
            OAuth2User oAuth2User = delegate.loadUser(request);
            String gitHubId = oAuth2User.getName();
            System.out.println(gitHubId);
            String selectedRole = getSelectedRole(gitHubId);

            if (INSTRUCTOR_ROLE.equalsIgnoreCase(selectedRole)) {
                handleUser(gitHubId, instructorService::getInstructorByGitHubId, instructorService::createInstructor, oAuth2User.getAttributes());
            } else if (STUDENT_ROLE.equalsIgnoreCase(selectedRole)) {
                handleUser(gitHubId, studentService::getStudentByGitHubId, studentService::createStudent, oAuth2User.getAttributes());
            }  else {
                throw new IllegalStateException("User role not determined");
            }
            return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(selectedRole)), oAuth2User.getAttributes(), "id");
        };
    }

    private String getSelectedRole(String gitHubId) {
        Object roleObj = httpServletRequest.getSession().getAttribute("selectedRole");
        if (roleObj != null) {
            return roleObj.toString();
        } else {
            if (userExists(gitHubId, studentService::getStudentByGitHubId)) {
                return STUDENT_ROLE;
            } else if (userExists(gitHubId, instructorService::getInstructorByGitHubId)) {
                return INSTRUCTOR_ROLE;
            }
        }
        return null;
    }

    private boolean userExists(String gitHubId, ThrowingFunction<String> getUserByGitHubId) {
        try {
            getUserByGitHubId.apply(gitHubId);
            return true;
        } catch (UserNotFoundException e) {
            return false;
        }
    }

    private void handleUser(String gitHubId,
                            ThrowingFunction<String> getUserByGitHubId,
                            ThrowingFunction<NewUserDto> createUser,
                            Map<String, Object> attributes) {
        try {
            getUserByGitHubId.apply(gitHubId);
        } catch (UserNotFoundException e) {
            createUser.apply(new NewUserDto(attributes.get("login").toString(),
                    attributes.get("email").toString(),
                    gitHubId));
        }
    }

    @FunctionalInterface
    interface ThrowingFunction<T> {
        void apply(T t) throws UserNotFoundException;
    }

}