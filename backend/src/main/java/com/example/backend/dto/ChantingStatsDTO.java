package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChantingStatsDTO {
    private int totalMalas;
    private int totalSessions;
    private int currentStreak;
    private int totalTimeSpentSeconds;
    private int weeklyMalas;     // malas in last 7 days
}