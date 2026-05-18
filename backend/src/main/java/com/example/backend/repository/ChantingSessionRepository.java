package com.example.backend.repository;

import com.example.backend.model.ChantingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChantingSessionRepository extends JpaRepository<ChantingSession, Long> {
    List<ChantingSession> findByUserIdOrderByDateDesc(Long userId);
    Optional<ChantingSession> findByUserIdAndDate(Long userId, LocalDate date);
    Optional<ChantingSession> findTopByUserIdOrderByDateDesc(Long userId);
}