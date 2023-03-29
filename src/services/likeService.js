import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const likeService = {
  likeHandler: async (kitId, user, setKit) => {
    const kitRef = doc(db, "shirts", kitId);
    const kitData = await getDoc(kitRef);

    const userLikes = kitData.data().userLikes || [];
    const userId = user.uid;

    if (userLikes.includes(userId)) {
      console.log("You already liked this kit!");
      return;
    }

    // Add user ID to userLikes array
    userLikes.push(userId);

    // Update Firestore document with new likes data
    await updateDoc(kitRef, {
      likes: userLikes.length,
      userLikes: userLikes,
    });

    // Fetch the updated kit data and set it in state
    const updatedKitData = await getDoc(kitRef);
    const updatedKit = { id: updatedKitData.id, ...updatedKitData.data() };
    setKit(updatedKit);
  },

  dislikeHandler: async (kitId, user, setKit) => {
    const kitRef = doc(db, "shirts", kitId);
    const kitData = await getDoc(kitRef);

    const userLikes = kitData.data().userLikes || [];
    const userId = user.uid;

    if (!userLikes.includes(userId)) {
      console.log("You have not liked this kit yet!");
      return;
    }

    // Remove user ID from userLikes array
    const updatedUserLikes = userLikes.filter((id) => id !== userId);

    // Update Firestore document with new likes data
    await updateDoc(kitRef, {
      likes: updatedUserLikes.length,
      userLikes: updatedUserLikes,
    });

    // Fetch the updated kit data and set it in state
    const updatedKitData = await getDoc(kitRef);
    const updatedKit = { id: updatedKitData.id, ...updatedKitData.data() };
    setKit(updatedKit);
  },
};