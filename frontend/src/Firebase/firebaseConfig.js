// import firebase from 'firebase/compat/app'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyD5p3Ra-pwAmlE8nK5fFEUfELHX5V29yKA",
  authDomain: "subscription-app-9cd47.firebaseapp.com",
  projectId: "subscription-app-9cd47",
  storageBucket: "subscription-app-9cd47.appspot.com",
  messagingSenderId: "616061384551",
  appId: "1:616061384551:web:438e5f9f60ab9f8a88e1c2"
};


  firebase.initializeApp(firebaseConfig)


const auth = firebase.auth();
export default firebase;
