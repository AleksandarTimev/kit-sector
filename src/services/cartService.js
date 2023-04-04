import { doc, updateDoc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { kitService } from "./kitService.js";
import { auth, db } from "../firebase";

export const cartService = {
  addToCartHandler: async (kitId, user, setCart, setKit) => {
    console.log(user)
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

    if (userCart.some((kit) => kit.id === kitId)) {
      alert("This item is already in your cart!");
      return;
    }

    // Get the full kit object from Firestore
    const kit = await kitService.getKitById(kitId);

    // Add the kit object to the user's cart
    userCart.push(kit);

    // Update Firestore document with new shopping cart data
    await updateDoc(userRef, {
      userCart: userCart,
      userId: user.uid,
    });

    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
    
    // Fetch the updated kit data and update the kit state
    const updatedKitData = await kitService.getKitById(kitId);
    setKit(updatedKitData);
    alert("Kit added to cart!");
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
  
    // Find the index of the kit in the userCart array
    const index = userCart.findIndex((kit) => kit.id === kitId);
    if (index === -1) {
      console.log("This item is not in your cart!");
      return;
    }
  
    // Remove the kit from the userCart array
    userCart.splice(index, 1);
  
    // Update Firestore document with new shopping cart data
    await updateDoc(userRef, {
      userCart: userCart,
    });
  
    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
    alert("Kit removed from cart!");
  },

  fetchCart: async () => {
    const user = auth.currentUser;
  
    if (!user) {
      throw new Error("User is not authenticated.");
    }
  
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const userCart = docSnap.data().userCart;
      // console.log(userCart);
      return userCart;
    } else {
      throw new Error("User cart does not exist.");
    }
  },

  orderHandled: async (user, setCart) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
  
    const userCart = userDoc.data().userCart || [];

    if (userCart.length === 0) {
      alert("Cart is empty!");
      return;
    }
  
    try {
      const ordersRef = collection(db, "orders");
      const orderDoc = await addDoc(ordersRef, {
        userId: user.uid,
        kitIds: userCart.map((kit) => kit.id),
        orderDate: new Date(),
      });
      console.log("Order document written with ID: ", orderDoc.id);
    } catch (error) {
      console.error("Error adding order document: ", error);
    }
  
    // Clear the user's cart
    await updateDoc(userRef, {
      userCart: [],
    });
  
    // Update the cart state
    setCart([]);
  
    alert("Your order has been confirmed!");
  }
};
