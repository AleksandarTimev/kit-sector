import { storage, db, auth } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
// import { useState } from 'react';

export const kitService = {
 getKits: async () => {
    const kitsRef = collection(db, "shirts");
    const snapshot = await getDocs(kitsRef);
    const kits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    return kits;
 },

  handleNameChange: (event, setName) => {
    setName(event.target.value);
  },

  handleDescriptionChange: (event, setDescription) => {
    setDescription(event.target.value);
  },

  handlePriceChange: (event, setPrice) => {
    setPrice(event.target.value);
  },

  handleConditionChange: (event, setCondition) => {
    setCondition(event.target.value);
  },

  handleImageChange: (event, setImage) => {
    setImage(event.target.files[0]);
  },

  handleSubmit: async (event, name, description, price, condition, image) => {
    event.preventDefault();
    if (!image) return;
    try {
      const storageRef = ref(storage, `kits/${image.name}`);
      const imageRef = ref(storageRef, image.name);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      await addDoc(collection(db, "shirts"), {
        name,
        description,
        price,
        condition,
        imageUrl,
        userId: auth?.currentUser?.uid,
      });
      alert("Uploaded successfully!");
    } catch (err) {
      alert("You are not logged-in!");
      console.log(err);
    }
  }
};