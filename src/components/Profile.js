import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { kitService } from "../services/kitService.js";
import "../public/css/NotFound.css";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const q = query(collection(db, "shirts"), where("userId", "==", user.uid));
        getDocs(q)
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
    //   console.log("Welcome, " + user.email + "!");
    }
  }, [user]);
  console.log(kits);  // log the entire kits array
  console.log(kits.map(kit => kit.id));
  return (
<div className="container">
  <h2>Profile:</h2>
  {/* <p>{user.email}</p> */}
  <h3>My Kits:</h3>
  {kits.length > 0 ? (
    <ul className="kits-grid">
      {kits.map((kit) => (
        <li className="kit-details li-catalog" key={kit.id}>
          <div>
            <h4>{kit.name}</h4>
            <img src={kit.imageUrl} alt={kit.name} />
          </div>
          <div className="kit-buttons">
            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => kitService.handleDetailsKit(kit.id, navigate)}
            >
              Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>You have not uploaded any kits yet.</p>
  )}
</div>
  );
};

export default Profile;