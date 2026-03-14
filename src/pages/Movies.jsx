import { useEffect, useMemo, useState } from "react";
import { getMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "./Movies.css";

const DUMMY_MOVIES = [
  {
    id: 1,
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    posterUrl: "/1pdfLvkbY9ohJlCjQH2JGjjcNsV.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    posterUrl: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    posterUrl: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest tests of his ability to fight injustice.",
    posterUrl: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
];

function normalizeMovies(input) {
  if (!Array.isArray(input)) return [];

  return input
    .map((movie, idx) => {
      if (typeof movie === "string") {
        return {
          id: `legacy-${idx}`,
          title: movie,
          description: "Fresh release on ShowDrop.",
          posterUrl: null,
        };
      }

      if (!movie || typeof movie !== "object") return null;

      return {
        ...movie,
        id: movie.id ?? `movie-${idx}`,
        title: movie.title || movie.name || "Untitled Movie",
        description: movie.description || movie.overview || "Details coming soon.",
      };
    })
    .filter(Boolean);
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    getMovies()
      .then((res) => {
        if (cancelled) return;
        const normalized = normalizeMovies(res.data);
        setMovies(normalized.length > 0 ? normalized : DUMMY_MOVIES);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || "Failed to load movies from server.");
        setMovies(DUMMY_MOVIES);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMovies = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return movies;

    return movies.filter((movie) => {
      const title = String(movie.title || "").toLowerCase();
      const description = String(movie.description || "").toLowerCase();
      const genres = String(movie.genres || "").toLowerCase();
      return title.includes(term) || description.includes(term) || genres.includes(term);
    });
  }, [movies, query]);

  return (
    <div className="movies-page">
      <div className="page-header">
        <h1 className="text-gradient">Now Showing</h1>
        <p className="subtitle">
          Discover the latest blockbusters, critically acclaimed indies, and everything in between.
        </p>

        <div className="search-bar glass">
          <input
            type="text"
            placeholder="Search for movies, genres, or theaters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="search-btn bg-gradient" aria-label="Search movies">
            Search
          </button>
        </div>
      </div>

      {error && <p className="loader">{error} Showing curated movies instead.</p>}

      {loading ? (
        <div className="loader">Loading amazing movies...</div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie, idx) => (
            <div key={movie.id || idx} style={{ animationDelay: `${idx * 0.1}s` }} className="movie-card-anim">
              <MovieCard movie={movie} />
            </div>
          ))}
          {filteredMovies.length === 0 && <div className="loader">No movies matched your search.</div>}
        </div>
      )}
    </div>
  );
}

export default Movies;
