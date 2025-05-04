import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 md:px-6">
      <h1 className="text-lg md:text-2xl lg:text-3xl py-2 md:py-4 text-white font-semibold">{title}</h1>
      <div className="flex overflow-x-auto gap-4 overflow-x-auto custom-scrollbar">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
