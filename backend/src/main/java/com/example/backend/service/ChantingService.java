package com.example.backend.service;

import com.example.backend.model.ChantingSession;
import com.example.backend.repository.ChantingSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChantingService {

    private final ChantingSessionRepository repository;

    // Save or update today's session
    public ChantingSession saveSession(Long userId, String mantra, int malas, int timeSpentSeconds) {
        LocalDate today = LocalDate.now();

        // Check if session exists for today
        Optional<ChantingSession> existing = repository.findByUserIdAndDate(userId, today);

        ChantingSession session;
        if (existing.isPresent()) {
            // Update existing
            session = existing.get();
            session.setMalas(session.getMalas() + malas);
            session.setTimeSpentSeconds(session.getTimeSpentSeconds() + timeSpentSeconds);
            session.setMantra(mantra);
        } else {
            // Create new
            session = new ChantingSession();
            session.setUserId(userId);
            session.setMantra(mantra);
            session.setMalas(malas);
            session.setTimeSpentSeconds(timeSpentSeconds);
            session.setDate(today);
            session.setStreak(calculateStreak(userId));
        }

        return repository.save(session);
    }

    // Get all sessions for user
    public List<ChantingSession> getSessions(Long userId) {
        return repository.findByUserIdOrderByDateDesc(userId);
    }

    // Get today's session
    public Optional<ChantingSession> getTodaySession(Long userId) {
        return repository.findByUserIdAndDate(userId, LocalDate.now());
    }

    // Get stats
    public Map<String, Object> getStats(Long userId) {
        List<ChantingSession> sessions = repository.findByUserIdOrderByDateDesc(userId);

        int totalMalas = sessions.stream().mapToInt(ChantingSession::getMalas).sum();
        int totalTime = sessions.stream().mapToInt(ChantingSession::getTimeSpentSeconds).sum();
        int streak = sessions.isEmpty() ? 0 : sessions.get(0).getStreak();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalMalas", totalMalas);
        stats.put("totalTimeSeconds", totalTime);
        stats.put("streak", streak);
        stats.put("totalSessions", sessions.size());
        return stats;
    }

    // Calculate streak
    private int calculateStreak(Long userId) {
        Optional<ChantingSession> lastSession = repository.findTopByUserIdOrderByDateDesc(userId);
        if (lastSession.isEmpty()) return 1;

        LocalDate lastDate = lastSession.get().getDate();
        LocalDate yesterday = LocalDate.now().minusDays(1);

        if (lastDate.equals(yesterday)) {
            return lastSession.get().getStreak() + 1;
        } else if (lastDate.equals(LocalDate.now())) {
            return lastSession.get().getStreak();
        }
        return 1;
    }
}