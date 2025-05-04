import { useSelector } from "react-redux";

// child components
import MovieList from "./MovieList";
import MovieSliderShimmer from "./MovieSliderShimmer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-38 px-2 relative z-20">
        {movies.nowPlaying ? (
          <MovieList title="Now Playing" movies={movies.nowPlaying} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}
        {movies.popular ? (
          <MovieList title="Popular" movies={movies.popular} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}
        {movies.topRated ? (
          <MovieList title="Top Rated" movies={movies.topRated} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}
        {movies.latest ? (
          <MovieList title="Latest Release" movies={movies.latest} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}
        {movies.bollywood ? (
          <MovieList title="Bollywood Superstar" movies={movies.bollywood} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.hollywood ? (
          <MovieList title="Hollywood Movies" movies={movies.hollywood} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.thriller ? (
          <MovieList title="Action Thriller" movies={movies.thriller} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.romance ? (
          <MovieList title="Romantic Movies" movies={movies.romance} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.horror ? (
          <MovieList title="Scary Movies" movies={movies.horror} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.comedy ? (
          <MovieList title="Indian Comedy Movies" movies={movies.comedy} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.adventure ? (
          <MovieList title="Adventurus Movies" movies={movies.adventure} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}

        {movies.animation ? (
          <MovieList title="Popular In Animation" movies={movies.animation} />
        ) : (
          <MovieSliderShimmer dimention={"w-28 md:w-36"} />
        )}
      </div>
    </div>
  );
};
export default SecondaryContainer;
