import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4RfHfr19WB6Z-dzhKdP-llZJXPq0s_nI",
  authDomain: "sellyourfootballshirt.firebaseapp.com",
  projectId: "sellyourfootballshirt",
  storageBucket: "sellyourfootballshirt.appspot.com",
  messagingSenderId: "710032717765",
  appId: "1:710032717765:web:3381398bb90347f1427dac"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);