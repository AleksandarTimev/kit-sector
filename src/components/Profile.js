import "../public/css/NotFound.css";
import { auth, db } from "../firebase.js";
import React, { useState, useEffect } from "react";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        db.collection("shirts").where("userId", "==", user.uid).get()
          .then((querySnapshot) => {
            const userKits = [];
            querySnapshot.forEach((doc) => {
              userKits.push(doc.data());
            });
            setKits(userKits);
          })
          .catch((error) => {
            console.log("Error getting kits: ", error);
          });
      } else {
        setUser(null);
      }
    });
    return () => {
      authListener();
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Welcome, " + user.email + "!");
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <>
          <h2>Profile:</h2>
          <p>{user.email}</p>
          <h3>My Kits:</h3>
          {kits.length > 0 ? (
            <ul>
              {kits.map((kit) => (
                <li key={kit.id}>{kit.name}</li>
              ))}
            </ul>
          ) : (
            <p>You have not uploaded any kits yet.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;