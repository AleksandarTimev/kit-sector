import { doc, updateDoc, getDoc, setDoc, getDocs, addDoc, collection } from "firebase/firestore";
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
    } else {
      // Create user document if it doesn't exist
      await setDoc(userRef, {
        email: user.email,
        userCart: [],
      });
    }

    if (userCart.includes(kitId)) {
      console.log("This item is already in your cart!");
      return;
    }

    // Add kitId to userCart array
    userCart.push(kitId);

    // Update Firestore document with new shopping cart data
    await updateDoc(userRef, {
      userCart: userCart,
      userId: user.uid,
    });

    // Add the shopping cart data to the "shoppingCarts" collection
    // await updateDoc(collection(db, "shoppingCarts"), {
    //   userId: user.uid,
    //   kitsIdInCart: userCart,
    // });

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

      userCart: updatedUserCart,
    });

    // Remove kitId from shoppingCarts collection
    const cartQuery = collection(db, "shoppingCarts")
      .where("userId", "==", user.uid)
      .where("kitIds", "array-contains", kitId);
    const cartDocs = await getDocs(cartQuery);
    cartDocs.forEach((doc) => {
      updateDoc(doc.ref, {
        kitIds: doc.data().kitIds.filter((id) => id !== kitId),
      });
    });

    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
  },
};