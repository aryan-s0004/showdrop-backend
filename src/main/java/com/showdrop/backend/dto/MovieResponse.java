package com.showdrop.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * API response DTO for Movie. Avoids exposing entity and allows shape control.
 */
@Data
@Builder
public class MovieResponse {

    private Long id;
    private String title;
    private String description;
    private String posterUrl;
    private String trailerUrl;
    private String genres;
    private String language;
    private Integer durationMinutes;
    private String certificate;
    private LocalDate releaseDate;
    private BigDecimal avgRating;
    private Integer totalRatings;
    private Boolean isActive;
}
