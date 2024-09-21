// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG9doNqI9rrcPCt3pDCge8a0MOeAJBC58",
  authDomain: "foodi-client-f9eec.firebaseapp.com",
  projectId: "foodi-client-f9eec",
  storageBucket: "foodi-client-f9eec.appspot.com",
  messagingSenderId: "1021830433994",
  appId: "1:1021830433994:web:5ebf0d51b8ae967bc17833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;