package com.showdrop.backend.repository;

import com.showdrop.backend.entity.Theater;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TheaterRepository extends JpaRepository<Theater, Long> {

    List<Theater> findByCityIgnoreCase(String city);

    List<Theater> findByCityIgnoreCaseAndIsActiveTrue(String city);
}
