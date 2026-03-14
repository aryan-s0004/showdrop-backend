package com.showdrop.backend.service;

import com.showdrop.backend.dto.MovieResponse;
import com.showdrop.backend.entity.Movie;
import com.showdrop.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    @Transactional(readOnly = true)
    public List<MovieResponse> getMovies() {
        return movieRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MovieResponse getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new com.showdrop.backend.exception.ResourceNotFoundException("Movie", id));
        return toResponse(movie);
    }

    public MovieResponse addMovie(Movie movie) {
        Movie saved = movieRepository.save(movie);
        return toResponse(saved);
    }

    private MovieResponse toResponse(Movie m) {
        return MovieResponse.builder()
                .id(m.getId())
                .title(m.getTitle())
                .description(m.getDescription())
                .posterUrl(m.getPosterUrl())
                .trailerUrl(m.getTrailerUrl())
                .genres(m.getGenres())
                .language(m.getLanguage())
                .durationMinutes(m.getDurationMinutes())
                .certificate(m.getCertificate())
                .releaseDate(m.getReleaseDate())
                .avgRating(m.getAvgRating())
                .totalRatings(m.getTotalRatings())
                .isActive(m.getIsActive())
                .build();
    }
}
