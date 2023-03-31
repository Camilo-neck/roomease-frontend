// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "roomease-59e01.firebaseapp.com",
    projectId: "roomease-59e01",
    storageBucket: "roomease-59e01.appspot.com",
    messagingSenderId: "857874450740",
    appId: "1:857874450740:web:b84a5083d3e3c0ee3afd61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);