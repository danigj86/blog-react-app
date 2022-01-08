// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMC6-owzK-xpdDAP406IrsN1rX36dUXDw",
  authDomain: "blog-react-app-4b2c8.firebaseapp.com",
  projectId: "blog-react-app-4b2c8",
  storageBucket: "blog-react-app-4b2c8.appspot.com",
  messagingSenderId: "400170305190",
  appId: "1:400170305190:web:01bf987e8e24339c9f1667",
  measurementId: "G-KCTC1CC4EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider  = new GoogleAuthProvider();
export const db = getFirestore(app);
