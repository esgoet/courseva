package com.github.esgoet.backend.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String userType, String id) {
        super("No " + userType + " found with id: " + id);
    }
}
