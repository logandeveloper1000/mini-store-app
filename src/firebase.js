// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD54kGOh-xLMeAh_RX5bu8TRMZliNhOB4A",
  authDomain: "portfolio-logandeveloper.firebaseapp.com",
  projectId: "portfolio-logandeveloper",
  storageBucket: "portfolio-logandeveloper.firebasestorage.app",
  messagingSenderId: "546326089695",
  appId: "1:546326089695:web:45e2f9855cc9a3ef96fe6a",
  measurementId: "G-XC9430XVZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);