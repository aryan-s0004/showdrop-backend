package com.showdrop.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "poster_url", length = 500)
    private String posterUrl;

    @Column(name = "trailer_url", length = 500)
    private String trailerUrl;

    // We store genres as JSON. MySQL 8 handles JSON natively.
    @Column(columnDefinition = "JSON")
    private String genres;

    @Column(nullable = false, length = 50)
    private String language;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(length = 10)
    private String certificate;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "tmdb_id", length = 20)
    private String tmdbId;

    @Column(name = "avg_rating", precision = 3, scale = 2, columnDefinition = "decimal(3,2) default 0.00")
    private BigDecimal avgRating;

    @Column(name = "total_ratings", columnDefinition = "int default 0")
    private Integer totalRatings;

    @Column(name = "is_active", columnDefinition = "boolean default true")
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
