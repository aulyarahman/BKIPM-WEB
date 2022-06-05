import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/functions";

const dev = {
  apiKey: "AIzaSyBHto8wiNuIcV9pugue_HZUY1NoXK_7nAk",
  authDomain: "test-function-app-56599.firebaseapp.com",
  projectId: "test-function-app-56599",
  storageBucket: "test-function-app-56599.appspot.com",
  messagingSenderId: "129299688381",
  appId: "1:129299688381:web:3ea0c5c6b7332e395dc0d4",
  measurementId: "G-ZQWSCE1DSQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(dev);
}

export const FbApp = firebase.app();
export const FbFunc = firebase.functions();
export const FbStorage = firebase.storage();
export const FbFirestore = firebase.firestore();
