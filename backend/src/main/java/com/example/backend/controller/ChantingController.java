package com.example.backend.controller;

import com.example.backend.model.ChantingSession;
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

    // Helper to get userId from token
    private Long getUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);
        // For now return email hashCode as userId
        // Later we'll get actual userId from DB
        return (long) Math.abs(email.hashCode());
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
        return ResponseEntity.ok(session);
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