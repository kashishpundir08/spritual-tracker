package com.example.backend.service;

import com.example.backend.model.CustomMantra;
import com.example.backend.repository.CustomMantraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomMantraService {

    private final CustomMantraRepository repository;

    // Add custom mantra
    public CustomMantra addMantra(Long userId, String mantra, String language) {
        if (repository.existsByUserIdAndMantra(userId, mantra)) {
            throw new RuntimeException("Mantra already exists!");
        }

        CustomMantra customMantra = new CustomMantra();
        customMantra.setUserId(userId);
        customMantra.setMantra(mantra);
        customMantra.setLanguage(language != null ? language : "English");
        return repository.save(customMantra);
    }

    // Get all mantras for user
    public List<CustomMantra> getMantras(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // Delete mantra
    public Map<String, String> deleteMantra(Long userId, Long mantraId) {
        CustomMantra mantra = repository.findById(mantraId)
                .orElseThrow(() -> new RuntimeException("Mantra not found!"));

        if (!mantra.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized!");
        }

        repository.delete(mantra);
        return Map.of("message", "Mantra deleted successfully!");
    }
}