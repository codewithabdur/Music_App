// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import 'firebase/compat/database'



const firebaseConfig = {
  apiKey: "AIzaSyBSIkPvTwGYniV0pi1phsKA4nvWdbbLjxc",
  authDomain: "register-data-bed5b.firebaseapp.com",
  databaseURL: "https://register-data-bed5b-default-rtdb.firebaseio.com",
  projectId: "register-data-bed5b",
  storageBucket: "register-data-bed5b.appspot.com",
  messagingSenderId: "44417762807",
  appId: "1:44417762807:web:04e716f8c6d04c532ddaf2",
  measurementId: "G-MJ5YRK4K47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = getAuth();
export const dataref = firebase.database();

export {firebase, auth};