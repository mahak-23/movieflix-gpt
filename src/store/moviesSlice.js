import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trailerVideo: null,
    nowPlaying: null,
    popular: null,
    topRated: null,
    latest: null,
    hollywood: null,
    bollywood: null,
    adventure: null,
    animation: null,
    comedy: null,
    horror: null,
    romance: null,
    thriller: null,
  },
  reducers: {
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    setMovie: (state, action) => {
      const { movieState, movieData } = action.payload;
      state[movieState] = movieData;
    },
  },
});

export const { addTrailerVideo, setMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
