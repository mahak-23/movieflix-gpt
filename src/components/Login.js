import React, { useRef, useState } from "react";

// hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux
import { addUser } from "../store/userSlice";

// child components
import Header from "./Header";

// auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";

import { BG_URL } from "../utils/constant.js";
import { checkValidationData } from "../utils/checkValidation";

// icons
import { InfoOutlined, ExpandMore, ExpandLess } from "@mui/icons-material";

const Login = () => {
  const [showGptInfo, setShowGptInfo] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const decodeErrorMessage = (error) => {
    const errorCode = error?.code || error?.message;
    let errorMessage = null;

    switch (errorCode) {
      case "auth/email-already-in-use":
      case "EMAIL_EXISTS":
        errorMessage = "Email you provided is already registered.";
        break;
      case "auth/user-disabled":
        errorMessage = "Your account has been disabled!";
        break;
      case "auth/invalid-login-credentials":
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Invalid login credentials.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak. Please choose a stronger one.";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Operation not allowed. Please contact support.";
        break;
      default:
        errorMessage = "Something went wrong with your credentials.";
        break;
    }
    return errorMessage;
  };

  const handleButtonClick = () => {
    setErrorMessage("");

    const message = checkValidationData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) {
      return;
    }
    setLoadingBtn(true);

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // update a user's basic profile information
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(decodeErrorMessage(error));
            });
        })
        .catch((error) => {
          setErrorMessage(decodeErrorMessage(error));
        })
        .finally(() => setLoadingBtn(false));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(decodeErrorMessage(error));
        })
        .finally(() => setLoadingBtn(false));
    }
  };

  return (
    <div className="relative h-[100vh] w-full">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="background"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Form */}
      <div className="absolute inset-0 z-9 flex justify-center items-center px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black bg-opacity-80 text-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-4 border border-yellow-400">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-semibold">
                <InfoOutlined fontSize="small" />
                GPT movie recommendations are restricted
              </div>
              <button
                type="button"
                onClick={() => setShowGptInfo(!showGptInfo)}
                className="text-yellow-700 hover:text-yellow-900"
              >
                {showGptInfo ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </button>
            </div>
            {showGptInfo && (
              <div className="mt-2 text-yellow-900 text-xs leading-relaxed ml-1">
                Available only for test credentials:
                <br />
                <strong>Email:</strong>{" "}
                <span className="font-mono">moviflix_test@gmail.com</span>
                <br />
                <strong>Password:</strong>{" "}
                <span className="font-mono">Movie@123</span>
              </div>
            )}
          </div>

          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 mb-4 w-full bg-gray-700 rounded outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-3 mb-4 w-full bg-gray-700 rounded outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 mb-4 w-full bg-gray-700 rounded outline-none focus:ring-2 focus:ring-red-500"
          />

          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>

          <button
            className="bg-red-600 hover:bg-red-700 p-3 w-full rounded-lg transition-colors"
            onClick={handleButtonClick}
            disabled={loadingBtn ? true : false}
          >
            {loadingBtn ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              </div>
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-md mt-6 flex items-center gap-2 justify-center">
            <span>
              {isSignIn ? "New to MovieflixGPT?" : "Already have an Account?"}
            </span>
            <span
              onClick={toggleSignInForm}
              className="text-white hover:underline cursor-pointer font-[600]"
            >
              Sign {isSignIn ? "up" : "in"} now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
