import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { TMDB_CDN_URL } from "../services/tmdbConfig";

const VideoBackground = ({ movieId, poster, backdrop, title }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-full h-full">
      <img
        className="h-full w-full object-cover md:hidden block"
        src={`${TMDB_CDN_URL}/w500${poster}`}
        alt={title}
      />
      <img
        className={`h-full w-full object-cover hidden md:block ${
          trailerVideo?.key && "xl:hidden"
        }`}
        src={`${TMDB_CDN_URL}/w1280${backdrop}`}
        alt={title}
      />
      {trailerVideo?.key && (
        <div className="w-full h-full hidden xl:block">
          <iframe
            className="w-full object-cover aspect-video"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
export default VideoBackground;
