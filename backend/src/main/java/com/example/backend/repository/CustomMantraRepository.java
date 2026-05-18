package com.example.backend.repository;

import com.example.backend.model.CustomMantra;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomMantraRepository extends JpaRepository<CustomMantra, Long> {
    List<CustomMantra> findByUserIdOrderByCreatedAtDesc(Long userId);
    boolean existsByUserIdAndMantra(Long userId, String mantra);
}