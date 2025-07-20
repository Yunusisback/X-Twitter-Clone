// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmOdyNk94NWikoWmRpDX6Kq-MRXRITXjg",
  authDomain: "x-twitter-clone-e0192.firebaseapp.com",
  projectId: "x-twitter-clone-e0192",
  storageBucket: "x-twitter-clone-e0192.firebasestorage.app",
  messagingSenderId: "607464629071",
  appId: "1:607464629071:web:be2159b227fe400c531b3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth alanın referansını alma
export const auth = getAuth(app);

// Google sağlayıcısı oluşturma
export const provider = new GoogleAuthProvider();

// veritabanının referansını alma
export const db = getFirestore(app);

// medya depolama alanının referansını alma
export const storage = getStorage(app);