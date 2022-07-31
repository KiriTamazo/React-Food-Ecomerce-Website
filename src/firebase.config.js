import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL9mYy8oLvcQ974HmXBzulXOQi1u9Mrq8",
  authDomain: "food-react-website.firebaseapp.com",
  databaseURL: "https://food-react-website-default-rtdb.firebaseio.com",
  projectId: "food-react-website",
  storageBucket: "food-react-website.appspot.com",
  messagingSenderId: "921761255297",
  appId: "1:921761255297:web:083356c94c1ff4446ba280",
  measurementId: "G-7W75P9S9QX",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
