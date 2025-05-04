import { useSelector } from "react-redux";

// child components
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import ShimmerMain from "./MainShimmer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying);

  if (!movies) return <ShimmerMain />;

  const mainMovie = movies[0];

  const { original_title, overview, id, poster_path, backdrop_path } =
    mainMovie;

  return (
    <div className="relative w-full h-full">
      <VideoTitle movieId={id} title={original_title} overview={overview} />
      <VideoBackground
        movieId={id}
        backdrop={backdrop_path}
        poster={poster_path}
        title={original_title}
      />
    </div>
  );
};
export default MainContainer;
