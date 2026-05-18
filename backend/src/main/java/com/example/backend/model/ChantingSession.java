package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "chanting_sessions")
public class ChantingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String mantra;
    private int malas;
    private int timeSpentSeconds;
    private LocalDate date;
    private int streak;
}