package com.showdrop.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "shows")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    @Column(name = "show_date", nullable = false)
    private LocalDate showDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "seat_pricing", nullable = false, columnDefinition = "JSON")
    private String seatPricing;

    @Column(name = "booked_seats", columnDefinition = "JSON default '[]'")
    private String bookedSeats;

    @Column(name = "locked_seats", columnDefinition = "JSON default '{}'")
    private String lockedSeats;

    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;

    @Column(name = "booked_count", columnDefinition = "int default 0")
    private Integer bookedCount;

    @Column(name = "locked_count", columnDefinition = "int default 0")
    private Integer lockedCount;

    @Column(name = "is_active", columnDefinition = "boolean default true")
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
