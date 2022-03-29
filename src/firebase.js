import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVUpxLCvfJODon5BJ06DrpE4jD96toFK0",
  authDomain: "clone-28d46.firebaseapp.com",
  databaseURL: "https://clone-28d46.firebaseio.com",
  projectId: "clone-28d46",
  storageBucket: "clone-28d46.appspot.com",
  messagingSenderId: "495545488789",
  appId: "1:495545488789:web:36dbb995af675e93b5d29c",
  measurementId: "G-WJ9QPDZFNL",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();

export default auth;
