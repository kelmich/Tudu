import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHZMJUX4TAb0M_GOMZT9l-1Zz3MPRSYSU",
  authDomain: "tudu-d4e61.firebaseapp.com",
  projectId: "tudu-d4e61",
  storageBucket: "tudu-d4e61.appspot.com",
  messagingSenderId: "326565606492",
  appId: "1:326565606492:web:a9d91cd7af57ee7f2f6299",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
