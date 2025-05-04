import React from "react";

// hooks
import { useSelector } from "react-redux";
import useMovie from "../hooks/useMovie";

// child components
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

import { MOVIES } from "../services/tmdbConfig";


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { nowPlaying, popular, topRated, latest } = MOVIES;

  useMovie(nowPlaying.endpoint, nowPlaying.type);
  useMovie(topRated.endpoint, topRated.type);
  useMovie(popular.endpoint, popular.type);
  useMovie(latest.endpoint, latest.type);

  // By genres
  useMovie(popular.endpoint, "bollywood", null, "hi");
  useMovie(popular.endpoint, "hollywood", null, "en");
  useMovie(popular.endpoint, "thriller", 53);
  useMovie(popular.endpoint, "romance", 10749);
  useMovie(popular.endpoint, "horror", 27);
  useMovie(popular.endpoint, "comedy", 35, "hi");
  useMovie(popular.endpoint, "adventure", 12);
  useMovie(popular.endpoint, "animation", 16);

  return showGptSearch ? (
    <GptSearch />
  ) : (
    <>
      <MainContainer />
      <SecondaryContainer />
    </>
  );
};

export default Browse;
