import { BG_URL } from "../utils/constant";

// child components
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      {" "}
      <div className="fixed -z-10 w-full">
        {" "}
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="logo"
        />{" "}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>{" "}
      <GptSearchBar /> <GptMovieSuggestions />{" "}
    </>
  );
};
export default GPTSearch;
