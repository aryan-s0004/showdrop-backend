package com.showdrop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.showdrop.backend.entity.Show;

public interface ShowRepository extends JpaRepository<Show, Long> {
}
