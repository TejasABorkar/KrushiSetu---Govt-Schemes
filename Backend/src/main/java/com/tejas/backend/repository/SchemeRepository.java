package com.tejas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.tejas.backend.model.Scheme;

import java.util.List;

public interface SchemeRepository extends JpaRepository<Scheme, Integer> {

    List<Scheme> findByCategory(String category);

    List<Scheme> findByState(String state);

    @Query("SELECT DISTINCT s.state FROM Scheme s")
    List<String> findDistinctStates();
}
