// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAATpyhpoUZYYCIxmR9P8bUGpo0XJSJpHQ",
    authDomain: "photocontest-4dc47.firebaseapp.com",
    projectId: "photocontest-4dc47",
    storageBucket: "photocontest-4dc47.appspot.com",
    messagingSenderId: "79011359254",
    appId: "1:79011359254:web:4ea84d07a52a77da7ca337"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
