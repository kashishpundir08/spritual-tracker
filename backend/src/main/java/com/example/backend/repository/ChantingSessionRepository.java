package com.example.backend.repository;

import com.example.backend.model.ChantingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChantingSessionRepository extends JpaRepository<ChantingSession, Long> {
    List<ChantingSession> findByUserIdOrderByDateDesc(Long userId);
    Optional<ChantingSession> findByUserIdAndDate(Long userId, LocalDate date);
    Optional<ChantingSession> findTopByUserIdOrderByDateDesc(Long userId);

    @Query("SELECT SUM(s.malas) FROM ChantingSession s WHERE s.userId = :userId")
    Integer getTotalMalas(@Param("userId") Long userId);

    @Query("SELECT SUM(s.timeSpentSeconds) FROM ChantingSession s WHERE s.userId = :userId")
    Integer getTotalTimeSpent(@Param("userId") Long userId);

    @Query("SELECT s FROM ChantingSession s WHERE s.userId = :userId " +
            "AND s.date >= :startDate ORDER BY s.date DESC")
    List<ChantingSession> findSessionsFromDate(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate
    );

    //  count total sessions
    int countByUserId(Long userId);

    // check if session exists for today
    boolean existsByUserIdAndDate(Long userId, LocalDate date);
}