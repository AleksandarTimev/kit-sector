import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";

export const register = async (email, password, confirmPassword, gender) => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      gender
    );
    // User has been registered successfully
    alert("User registered successfully!");
    console.log(user);
  } catch (error) {
    alert(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    alert("User logged-in successfully!");
    console.log(user);
  } catch (error) {
    alert(error.message);
  }
};

export const logout = async () => {
  
  await signOut(auth);
};
