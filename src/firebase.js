/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; */
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPDEYv7G-kT3RHuMmsZRrBfjWQQmnxAT8",
  authDomain: "bbs-with-fortnite.firebaseapp.com",
  projectId: "bbs-with-fortnite",
  storageBucket: "bbs-with-fortnite.appspot.com",
  messagingSenderId: "416260345574",
  appId: "1:416260345574:web:69ce83baaf35e8249d3527",
  measurementId: "G-1DC4W51BFT",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

// const analytics = getAnalytics(firebaseApp);

export { db };
