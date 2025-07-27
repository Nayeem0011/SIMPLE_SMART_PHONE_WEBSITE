import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7piUMHwA8GaWehQ40E18aS87nSm5IbFY",
  authDomain: "shopsmart-a1036.firebaseapp.com",
  projectId: "shopsmart-a1036",
  storageBucket: "shopsmart-a1036.firebasestorage.app",
  messagingSenderId: "863450039152",
  appId: "1:863450039152:web:9853f137cae48dc6b7c5b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

