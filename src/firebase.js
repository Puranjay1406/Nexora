import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTSolOmbjzueYxFpUJJtWDH9siyOFOpYE",
  authDomain: "nexora-50281.firebaseapp.com",
  projectId: "nexora-50281",
  storageBucket: "nexora-50281.firebasestorage.app",
  messagingSenderId: "866006978998",
  appId: "1:866006978998:web:dacfe44fa0dd8d2ae23117",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);