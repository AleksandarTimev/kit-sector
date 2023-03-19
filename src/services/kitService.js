import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
// import { useState } from 'react';

export const kitService = {
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
      console.log(err);
    }
  }
};