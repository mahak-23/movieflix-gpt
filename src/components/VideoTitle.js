import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ movieId, title, overview }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 md:px-16 bg-gradient-to-r from-black via-transparent to-transparent text-white z-12">
      <h1 className="text-2xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="hidden md:block text-md md:text-lg mb-4 w-full md:w-1/2 lg:w-1/3">
        {overview}
      </p>
      <div className="flex gap-4">
        <button
          className="bg-white text-black  py-2 px-4 text-sm md:text-lg font-semibold rounded-lg hover:bg-opacity-80 flex items-center gap-2"
          onClick={() => navigate(`/watch/${movieId}`)}
        >
          <PlayArrow /> Play
        </button>
        <button className="bg-gray-600 bg-opacity-60 text-white py-2 px-4 text-sm md:text-lg font-semibold rounded-lg flex items-center gap-2">
          <InfoOutlined /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
