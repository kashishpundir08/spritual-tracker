package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserProfileController {
    private final UserProfileService service;

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam String email){
        return ResponseEntity.ok(service.getProfile(email));
    }
    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody User user){
        return ResponseEntity.ok(service.updateProfile(user));
    }
}
