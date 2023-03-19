import { useState, useEffect } from "react";
import { db } from "../firebase.js"
import { getDocs, collection } from "firebase/firestore";
 

export const Catalog = () => {
  const [shirtList, setShirtList] = useState([]);

  const shirtCollectionRef = collection(db, "shirts");
  
  useEffect(()=> {
    const getShirtList = async () => {
        try{
            const data = await getDocs(shirtCollectionRef);
            const filteredData = data.docs.map((shirt) => ({
                 ...shirt.data(),
                 id: shirt.id,
                 name: shirt.name}))
            console.log(filteredData);
        } catch(err){
            console.error(err);
        }
    };

    getShirtList()
  }, []);

  return (
    <div>catalog</div>
    );
};

export default Catalog;