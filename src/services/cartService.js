import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { kitService } from "./kitService.js";
import { db } from "../firebase";

export const cartService = {
  addToCartHandler: async (kitId, user, setCart, setKit) => {
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

    // // Remove kitId from shoppingCarts collection
    // const cartQuery = collection(db, "shoppingCarts")
    //   .where("userId", "==", user.uid)
    //   .where("kitIds", "array-contains", kitId);
    // const cartDocs = await getDocs(cartQuery);
    // cartDocs.forEach((doc) => {
    //   updateDoc(doc.ref, {
    //     kitIds: doc.data().kitIds.filter((id) => id !== kitId),
    //   });
    // });

    // Fetch the updated user data and set the cart state
    const updatedUserData = await getDoc(userRef);
    const updatedCart = updatedUserData.data().userCart || [];
    setCart(updatedCart);
  },

  fetchCart: async (user, setCart, setKits) => {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    console.log(userData);

    if (userData.exists()) {
      const userCart = userData.data().userCart || [];
      setCart(userCart);
      console.log(userCart);

      // Fetch the kit data for each kit in the cart
      const kitData = {};
      await Promise.all(
        userCart.map(async (kitId) => {
          const kitRef = doc(db, "shirts", kitId);
          const kitDoc = await getDoc(kitRef);
          if (kitDoc.exists()) {
            kitData[kitId] = kitDoc.data();
            console.log(kitData);
          }
        })
      );
      setKits(kitData);
      console.log(kitData);
    } else {
      setCart([]);
      console.log(setCart);
    }
  },
};
