package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserRepository repo;

    public User getProfile(String email){
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not available with this email"));
        return user;
    }
    public User updateProfile(User updatedUser){
        User existing = repo.findByEmail(updatedUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with this email"));
        existing.setName(updatedUser.getName());
        return repo.save(existing);
    }
}
