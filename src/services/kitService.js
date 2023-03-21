import { storage, db, auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  // updateDoc
} from "firebase/firestore";
import { useState } from "react";

 // initialize the storage reference

export const kitService = {

  getKits: async () => {
    const kitsRef = collection(db, "shirts");
    const snapshot = await getDocs(kitsRef);
    const kits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return kits;
  },

getKitById: async (id) => {
  try {
    const kitDoc = doc(db, "shirts", id);
    const kitSnap = await getDoc(kitDoc);
    if (kitSnap.exists()) {
      const kitData = kitSnap.data();
      const storageRef = ref(storage, kitData.imageUrl);
      const imageUrl = await getDownloadURL(storageRef);
      return { id: kitSnap.id, ...kitData, imageUrl };
    } else {
      throw new Error("Kit not found.");
    }
  } catch (err) {
    console.log(err);
    alert("Could not retrieve kit.");
  }
},

handleEditSubmit: async (event, id, name, description, price, condition, image) => {
  event.preventDefault();
  try {
    const kitRef = doc(db, "shirts", id);
    const kit = await getDoc(kitRef);
    const kitData = kit.data();
    let imageUrl = kitData.imageUrl;

    if (image !== null) {
      const storageRef = ref(storage, imageUrl);
      await uploadBytes(storageRef, image);
      imageUrl = imageUrl + `?v=${new Date().getTime()}`;
    }

    await setDoc(kitRef, {
      name: name,
      description: description,
      price: Number(price),
      condition: condition,
      imageUrl: imageUrl,
    });

    alert("Kit updated successfully!");
  } catch (err) {
    console.log(err);
    alert("Could not update kit.");
  }
},

  handleDeleteKit: async (id) => {
    try {
      const kit = doc(db, "shirts", id);
      await deleteDoc(kit);
      alert("Kit deleted successfully!");
    } catch (err) {
      console.log(err)
      alert("Could not delete kit!");
    }
  },

  useEditKit: () => {
    const [kitId, setKitId] = useState(null);
    const navigate = useNavigate();
    const handleEditKit = (id) => {
      setKitId(id);
      navigate(`/edit/${id}`);
    };
    
    return {
      kitId,
      handleEditKit,
    };
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
  },
};