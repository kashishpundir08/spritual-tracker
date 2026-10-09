package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.model.ChantingSession;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ChantingService;
import com.example.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chanting")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChantingController {

    private final ChantingService chantingService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    // Helper to get userId from token
    private Long getUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveSession(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> request) {

        Long userId = getUserId(authHeader);
        String mantra = (String) request.get("mantra");
        int malas = (int) request.get("malas");
        int timeSpentSeconds = (int) request.get("timeSpentSeconds");

        ChantingSession session = chantingService.saveSession(userId, mantra, malas, timeSpentSeconds);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true, "Session created", session
                )
        );
    }

    @GetMapping("/today")
    public ResponseEntity<?> getTodaySession(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = getUserId(authHeader);
        return ResponseEntity.ok(chantingService.getTodaySession(userId));
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = getUserId(authHeader);
        return ResponseEntity.ok(chantingService.getStats(userId));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = getUserId(authHeader);
        return ResponseEntity.ok(chantingService.getSessions(userId));
    }
}