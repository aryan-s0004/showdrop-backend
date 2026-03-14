package com.showdrop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.showdrop.backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
