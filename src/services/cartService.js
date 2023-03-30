import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const cartService = {
  addToCartHandler: async (kitId, user, setCart) => {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    let userCart = [];

    if (userData.exists()) {
      const userDataObj = userData.data();
      if (userDataObj.hasOwnProperty("userCart")) {
        userCart = userDataObj.userCart;
      }
    }

    if (userCart.includes(kitId)) {
      console.log("This item is already in your cart!");
      return;
    }

    // Add kitId to userCart array
    userCart.push(kitId);

    // Update Firestore document with new shopping cart data
    await updateDoc(userRef, {
      ...userData.data(),
      userCart: userCart,
    });

    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
  },

  removeFromCartHandler: async (kitId, user, setCart) => {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    let userCart = [];
    if (userData.exists()) {
      const userDataObj = userData.data();
      if (userDataObj.hasOwnProperty("userCart")) {
        userCart = userDataObj.userCart;
      }
    }

    if (!userCart.includes(kitId)) {
      console.log("This item is not in your cart!");
      return;
    }

    // Remove kitId from userCart array
    const updatedUserCart = userCart.filter((id) => id !== kitId);

    // Update Firestore document with new shopping cart data
    await updateDoc(userRef, {
      ...userData.data(),
      userCart: updatedUserCart,
    });

    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
  },
};