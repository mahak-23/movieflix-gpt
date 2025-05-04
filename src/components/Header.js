import React, { useEffect } from "react";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { LOGO, USER_AVATAR, SUPPORTED_LANGUAGES } from "../utils/constant";

// redux
import { addUser, removeUser } from "../store/userSlice";
import { toggleGptSearchView } from "../store/gptSlice";
import { changeLanguage } from "../store/configSlice";

// icons
import { Home, SearchOutlined } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    if (window.location.pathname !== "/browse") {
      navigate("/browse");
    }
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-gradient-to-b from-black via-transparent to-transparent px-4 py-3 md:px-8 flex flex-wrap items-center justify-between gap-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <img src={LOGO} alt="Movieflix Logo" className="w-24 md:w-40" />
      </div>

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-2 flex-wrap justify-end ml-auto">
          {showGptSearch && (
            <select
              className="px-3 py-1.5 bg-gray-900 text-white rounded-md text-sm shadow-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-700 text-white rounded-md text-sm shadow-sm transition-all duration-200"
          >
            {showGptSearch ? (
              <Home className="text-white text-base" />
            ) : (
              <SearchOutlined className="text-white text-base" />
            )}
            <span className="hidden sm:inline">
              {showGptSearch ? "Homepage" : "GPT Search"}
            </span>
          </button>

          <img
            src={user.photoURL || USER_AVATAR}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border-2 border-white object-cover"
          />

          <button
            onClick={handleSignOut}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
