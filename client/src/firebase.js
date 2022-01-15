// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEU0fVvyYCo1J8QQrHZkhQb0fMioyksYU",
  authDomain: "ecom-7e37b.firebaseapp.com",
  projectId: "ecom-7e37b",
  storageBucket: "ecom-7e37b.appspot.com",
  messagingSenderId: "991439521735",
  appId: "1:991439521735:web:8b0b08d55fab02348a7be2",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// export
// export default firebase;
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { auth, googleAuthProvider };
