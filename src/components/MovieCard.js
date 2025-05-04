import { Link, useNavigate } from "react-router-dom";
import { TMDB_CDN_URL } from "../services/tmdbConfig";

// icons
import {
  Star as StarIcon,
  Language as LanguageIcon,
  Movie as MovieIcon,
} from "@mui/icons-material";

const MovieCard = ({ movie }) => {

  if (!movie?.poster_path) return null;

  return (
    <Link
      to={`/watch/${movie.id}`}
      className="relative group w-28 sm:w-32 md:w-40 lg:w-48 aspect-[2/3] flex-shrink-0 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Movie Poster */}
      <img
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        alt={movie.title}
        src={`${TMDB_CDN_URL}/w500${movie.poster_path}`}
        loading="lazy"
      />

      {/* Bottom Overlay Info */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white text-xs sm:text-sm p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <div className="flex items-center gap-1 mb-1 truncate">
          <MovieIcon fontSize="small" />
          <span className="font-semibold truncate" title={movie.title}>
            {movie.title}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-1">
            <LanguageIcon fontSize="small" />
            <span className="capitalize">{movie.original_language}</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon fontSize="small" className="text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
