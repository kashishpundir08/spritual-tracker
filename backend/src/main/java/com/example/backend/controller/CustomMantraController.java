package com.example.backend.controller;

import com.example.backend.model.CustomMantra;
import com.example.backend.service.CustomMantraService;
import com.example.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mantras")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomMantraController {

    private final CustomMantraService customMantraService;
    private final JwtService jwtService;

    private Long getUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);
        return (long) Math.abs(email.hashCode());
    }

    // Add mantra
    @PostMapping("/add")
    public ResponseEntity<?> addMantra(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> request) {
        Long userId = getUserId(authHeader);
        String mantra = request.get("mantra");
        String language = request.get("language");

        if (mantra == null || mantra.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mantra cannot be empty!"));
        }

        CustomMantra saved = customMantraService.addMantra(userId, mantra.trim(), language);
        return ResponseEntity.ok(saved);
    }

    // Get all mantras
    @GetMapping("/list")
    public ResponseEntity<List<CustomMantra>> getMantras(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = getUserId(authHeader);
        return ResponseEntity.ok(customMantraService.getMantras(userId));
    }

    // Delete mantra
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMantra(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        Long userId = getUserId(authHeader);
        return ResponseEntity.ok(customMantraService.deleteMantra(userId, id));
    }
}