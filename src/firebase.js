// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbryGtRbMfUszQ-Jv7z_dRmdt01sgVpTA",
  authDomain: "todolist-a057d.firebaseapp.com",
  projectId: "todolist-a057d",
  storageBucket: "todolist-a057d.appspot.com",
  messagingSenderId: "133392772408",
  appId: "1:133392772408:web:e57ab074da5be29523a5cd",
  measurementId: "G-LJG8WLZ994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};