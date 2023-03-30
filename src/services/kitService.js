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
  query,
  where
  // updateDoc
} from "firebase/firestore";
import { useState } from "react";

export const kitService = {

getKits: async () => {
    const kitsRef = collection(db, "shirts");
    const snapshot = await getDocs(kitsRef);
    const kits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(kits)
    return kits;
  },

  getUserKits: async () => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const q = query(
      collection(db, "shirts"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const userKits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userKits;
  },

 handleDetailsKit: (id, navigate) => {
  console.log(id)
    navigate(`/details/${id}`)
  },

getKitById: async (id) => {
  try {
    const kitDoc = doc(db, "shirts", id);
    const kitSnap = await getDoc(kitDoc);
    if (kitSnap.exists()) {
      const kitData = kitSnap.data();
      const storageRef = ref(storage, kitData.imageUrl);
      const imageUrl = await getDownloadURL(storageRef);
      console.log(kitData)
      return { id: kitSnap.id, ...kitData, imageUrl };
    } else {
      throw new Error("Kit not found.");
    }
  } catch (err) {
    console.log(err);
    alert("Could not retrieve kit.");
  }
},

handleEditSubmit: async (event, id, name, description, price, condition, image, navigate) => {
  event.preventDefault();
  try {
    const kitRef = doc(db, "shirts", id);
    const kit = await getDoc(kitRef);
    const kitData = kit.data();
    let imageUrl = kitData.imageUrl;
    const likes = kitData.likes;
    const userLikes = kitData.userLikes;
    console.log(userLikes);

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
      userId: auth?.currentUser?.uid,
      userLikes: userLikes,
      likes: likes,
    });
    alert("Kit updated successfully!");
    navigate(`/details/${kit.id}`)
  } catch (err) {
    console.log(err);
    alert("Could not update kit.");
  }
},

  handleDeleteKit: async (id, navigate) => {
    try {
      const kit = doc(db, "shirts", id);
      await deleteDoc(kit);
      alert("Kit deleted successfully!");
      navigate("/catalog");
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

  handleSubmit: async (event, name, description, price, condition, image, navigate) => {
    event.preventDefault();
    if (!image) {
      return;
    } 

    const acceptedFileTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!acceptedFileTypes.includes(image.type)) {
      alert("Please upload a valid image file (PNG, JPEG, or WEBP).");
      return;
    }
  
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
        likes:0,
      });
      alert("Uploaded successfully!");
      navigate('/catalog');
    } catch (err) {
      alert("You are not logged-in!");
      console.log(err);
    }
  },
};