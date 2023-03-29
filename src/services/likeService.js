import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const likeService =  {

likeHandler: async (kitId) => {
  const kitRef = doc(db, "shirts", kitId);
  console.log("like given")
  await updateDoc(kitRef, { likes: increment(1) });
},
}