// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-bd5e0.firebaseapp.com",
  projectId: "netflixgpt-bd5e0",
  storageBucket: "netflixgpt-bd5e0.firebasestorage.app",
  messagingSenderId: "104275439053",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-JKTZZ6142Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
