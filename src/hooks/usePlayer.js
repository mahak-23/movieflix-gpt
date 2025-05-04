import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlayer } from "../store/playerSlice";
import { TMDB_API_OPTIONS, TMDB_API_URL } from "../services/tmdbConfig";

const usePlayer = (endpoint, playerState, contentId) => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      // Fetch data for {videoState}
      const response = await fetch(
        `${TMDB_API_URL}/${endpoint}/${contentId}?language=en-US`,
        TMDB_API_OPTIONS
      );
      const media = await response.json();
      if (!media) return null;

      const { success, status_message } = await media;

      if (success === false) return status_message;

      // Fetch videos for media.id
      const videoResponse = await fetch(
        `${TMDB_API_URL}/movie/${media.id}/videos?language=en-US`,
        TMDB_API_OPTIONS
      );
      const videoResult = await videoResponse.json();

      const mediaResult = {
        info: media,
        videos: videoResult,
      };
      dispatch(setPlayer({ playerState, playerData: mediaResult }));
      return mediaResult;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default usePlayer;
