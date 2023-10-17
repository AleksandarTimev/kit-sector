import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export const register = async (email, password, confirmPassword, gender) => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await addDoc(collection(db, "users"), {
      email,
      gender,
      userId: userCredential.user.uid
    });

    alert("User registered successfully!");
    console.log(userCredential.user);
  } catch (error) {
    alert(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    alert("User logged-in successfully!");
  } catch (error) {
    alert(error.message);
  }
};

export const logout = async () => {
  
  await signOut(auth);
};
