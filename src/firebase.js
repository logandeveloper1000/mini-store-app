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
  apiKey: "AIzaSyB1TWj5WC5yEWYmQCkc8pqx5xvrkhEbN3A",
  authDomain: "logan-portolio.firebaseapp.com",
  projectId: "logan-portolio",
  storageBucket: "logan-portolio.firebasestorage.app",
  messagingSenderId: "254880871321",
  appId: "1:254880871321:web:55b28084bebdda374b5908",
  measurementId: "G-9V8FZZPC4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);