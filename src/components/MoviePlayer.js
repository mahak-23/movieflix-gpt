import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// hooks
import usePlayer from "../hooks/usePlayer";

// child components
import {
  VideoInfoShimmerUI,
  VideoPlayerShimmerUI,
} from "./MoviePlayerShimmerUI";

// icons
import {
  Movie,
  Language,
  Public,
  AccessTime,
  Business,
  Info,
} from "@mui/icons-material";

import { TMDB_CDN_URL } from "../services/tmdbConfig";

const MoviePlayer = () => {
  const { contentId } = useParams();

  // Custom hook to fetch data
  usePlayer("movie", "playing", contentId);

  const videoInfo = useSelector((store) => store?.player?.playing?.info);
  const videos = useSelector((store) => store?.player?.playing?.videos);

  const videoKey = videos?.results?.[0]?.key || null;

  return (
    <div className="relative w-full min-h-screen bg-black text-white px-4 md:px-8 pb-8">
      <div className="pt-16 h-[70vh] px-4 md:px-8">
        {!videos ? (
          <VideoPlayerShimmerUI />
        ) : (
          <VideoPlayer videoKey={videoKey} fallbackData={videoInfo} />
        )}
      </div>

      {!videoInfo ? <VideoInfoShimmerUI /> : <VideoInfo info={videoInfo} />}
    </div>
  );
};

const VideoInfo = ({ info }) => {
  const {
    title,
    overview,
    genres,
    production_companies,
    production_countries,
    release_date,
    runtime,
    original_language,
    popularity,
  } = info;

  return (
    <div className="max-w-5xl mx-auto space-y-4 p-5">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Movie /> {title}
      </h2>

      <p className="text-gray-300">{overview}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-400">
        <div className="flex items-start gap-2">
          <Public fontSize="small" />
          <span>
            <strong>Countries:</strong>{" "}
            {production_countries.map((c) => c.name).join(", ")}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <Business fontSize="small" />
          <span>
            <strong>Companies:</strong>{" "}
            {production_companies.map((c) => c.name).join(", ")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AccessTime fontSize="small" />
          <span>
            <strong>Runtime:</strong> {runtime} min
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Language fontSize="small" />
          <span>
            <strong>Language:</strong> {original_language?.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Info fontSize="small" />
          <span>
            <strong>Release Date:</strong> {release_date}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Info fontSize="small" />
          <span>
            <strong>Popularity:</strong> {popularity.toFixed(1)}
          </span>
        </div>

        <div className="flex items-start gap-2 col-span-full">
          <Movie fontSize="small" />
          <span>
            <strong>Genres:</strong>{" "}
            {genres.map((genre) => genre.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({ videoKey, fallbackData }) => {
  const { backdrop_path, original_title } = fallbackData || {};

  if (!videoKey) {
    return (
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <img
          src={`${TMDB_CDN_URL}/w780${backdrop_path}`}
          alt={original_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl font-bold mb-4">
            {original_title}
          </h1>
          <p className="text-lg text-gray-300 mb-6">Video not available</p>
          <Link
            to="/browse"
            className="bg-red-600 px-6 py-2 rounded text-white hover:bg-red-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="w-full h-full rounded-xl shadow-lg"
      src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1`}
      title="YouTube player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default MoviePlayer;
