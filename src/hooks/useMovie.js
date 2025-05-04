import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovie } from "../store/moviesSlice";
import { TMDB_API_OPTIONS, TMDB_API_URL } from "../services/tmdbConfig";

const useMovie = (endpoint, movieState, genreId, originalLanguage) => {
  const dispatch = useDispatch();
  const movieData = useSelector((store) => store.movies[movieState]);

  const fetchData = async () => {
    try {
      let apiUrl = `${TMDB_API_URL}/discover/movie?language=en-US&page=1&adult=true`;

      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }

      if (originalLanguage) {
        apiUrl += `&with_original_language=${originalLanguage}`;
      }

      const response = await fetch(apiUrl, TMDB_API_OPTIONS);
      const result = await response.json();
      dispatch(setMovie({ movieState, movieData: result.results }));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !(movieData && movieData.length > 0) && fetchData();
  }, []);
};

export default useMovie;
