import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import openai from "../services/openaiConfig";
import lang from "../utils/languageConstants";
import { TMDB_API_OPTIONS, TMDB_API_URL } from "../services/tmdbConfig";

// redux
import { addGptMovieResult } from "../store/gptSlice";

// icons
import { Close } from "@mui/icons-material";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const userEmail = useSelector((store) => store?.user?.email);
  const [user, setUser] = useState(userEmail);
  const [inputValue, setInputValue] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearPrompt = () => {
    setInputValue("");
    dispatch(
      addGptMovieResult({
        movieNames: null,
        movieResults: null,
      })
    );
  };

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        TMDB_API_URL +
          "/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        TMDB_API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fallbackToTMDBSearch = async () => {
    try {
      const results = await searchMovieTMDB(inputValue);
      dispatch(
        addGptMovieResult({
          movieNames: [inputValue],
          movieResults: [results],
        })
      );
    } catch (fallbackError) {
      console.error("Fallback TMDB search failed:", fallbackError);
    }
  };

  const handleGptSearchClick = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    setLoadingBtn(true);

    try {
      if (user !== "moviflix_test@gmail.com") {
        alert(
          "GPT is restricted to moviflix_test@gmail.com user only. Using direct search instead."
        );
        await fallbackToTMDBSearch();
        return;
      }

      const gptQueryPrompt =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        inputValue +
        ". Only give me names of 5 movies, comma separated. Example Result: Hero, Barbie, Phir Hera Pheri";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQueryPrompt }],
        model: "gpt-3.5-turbo",
      });

      const gptResponseText = gptResults.choices?.[0]?.message?.content;
      if (!gptResponseText) {
        console.error("GPT returned no content. Falling back to TMDB.");
        await fallbackToTMDBSearch();
        return;
      }

      const gptMovies = gptResponseText
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      const tmdbResponses = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResponses,
        })
      );
    } catch (error) {
      console.error("Error during GPT search:", error);

      // Check for quota error
      const isQuotaError =
        error?.message?.includes("quota") ||
        error?.error?.code === "insufficient_quota";

      if (isQuotaError) {
        alert("GPT quota exceeded. Using direct search instead.");
      } else {
        alert(
          "An error occurred while using GPT. Falling back to direct search."
        );
      }

      await fallbackToTMDBSearch();
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-3xl bg-gray-900 rounded-lg p-4 shadow-lg transition duration-300 space-y-2"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              disabled={loadingBtn === "" ? true : false}
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              className="w-full pl-4 md:pl-12 pr-12 py-3 bg-gray-800 text-white rounded-l-lg focus:outline-none placeholder-gray-400 text-sm md:text-base"
              placeholder={lang[langKey].gptSearchPlaceholder}
            />
            {/* Clear Icon (if needed) */}
            {inputValue && (
              <span
                onClick={handleClearPrompt}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                <Close style={{ fontSize: "26px" }} />
              </span>
            )}
          </div>

          <button
            onClick={handleGptSearchClick}
            disabled={loadingBtn === "" ? true : false}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-200 text-sm md:text-base"
          >
            {loadingBtn ? (
              <div className="w-5 h-5 border-t m border-gray-300 border-solid rounded-full animate-spin"></div>
            ) : (
              lang[langKey].search
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 md:text-sm">
          Note: Movie recommendations powered by GPT are available on request
          due to paid APIs.
          <a
            href="https://www.linkedin.com/in/mahak-k-100971232/"
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-gray-300 hover:text-white underline"
          >
            Request now
          </a>
        </p>
      </form>
    </div>
  );
};
export default GptSearchBar;
