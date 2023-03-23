import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { kitService } from "../services/kitService.js";
import "../public/css/Profile.css";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const q = query(
          collection(db, "shirts"),
          where("userId", "==", user.uid)
        );
        getDocs(q)
        .then((querySnapshot) => {
          const userKits = [];
          querySnapshot.forEach((doc) => {
            userKits.push({ ...doc.data(), id: doc.id });
          });
          setKits(userKits);
        })
        .catch((error) => {
          console.log("Error getting kits: ", error);
          });
        } else {
        setUser(null);
        navigate('/notauthorized')
      }
    });
    return () => {
      authListener();
    };
  }, [navigate]);
  
  console.log(kits)

  return (
    <div className="container">
      <div className="profile-pic">
        <h2>Profile</h2>
        <img
          src="https://cdn4.iconfinder.com/data/icons/basics-set-2/100/User_Profile-512.png"
          alt="Avatar"
          width="75"
          height="75"
        />
            {user && <p>Email: {user.email}</p>}
      </div>
      <div className="profile">
        <div className="avatar"></div>
        <div className="profile-kits">
          <h3>Your Kits:</h3>
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
                      onClick={() =>
                        kitService.handleDetailsKit(kit.id, navigate)
                      }
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
      </div>
    </div>
  );
};

export default Profile;
