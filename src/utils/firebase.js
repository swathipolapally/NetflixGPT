// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJim778WseysCTpr5smjw9QjUceu8kGl4",
  authDomain: "netflixgpt-d3958.firebaseapp.com",
  projectId: "netflixgpt-d3958",
  storageBucket: "netflixgpt-d3958.firebasestorage.app",
  messagingSenderId: "544417757856",
  appId: "1:544417757856:web:e4c0883b34d0fd54b667c5",
  measurementId: "G-1NZ31ZXTQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();