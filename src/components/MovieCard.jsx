import "./MovieCard.css";

function MovieCard({ movie }) {
  const safeMovie =
    movie && typeof movie === "object"
      ? movie
      : {
          title: typeof movie === "string" ? movie : "Unknown Movie",
          description: "A spectacular visual experience you do not want to miss.",
        };

  const posterUrl =
    safeMovie.poster ||
    safeMovie.posterUrl ||
    (safeMovie.poster_path ? `https://image.tmdb.org/t/p/w500${safeMovie.poster_path}` : null) ||
    "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg";

  return (
    <div className="movie-card glass-panel">
      <div className="card-image-wrapper">
        <img src={posterUrl} alt={safeMovie.title || "Movie Poster"} className="card-image" />
        <div className="card-overlay">
          <button className="book-btn" type="button">
            Book Ticket
          </button>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{safeMovie.title || "Unknown Movie"}</h3>
        <p className="card-desc">
          {safeMovie.description ||
            "A spectacular visual experience you do not want to miss. Get your tickets now before they run out."}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
