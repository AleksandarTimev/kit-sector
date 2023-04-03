import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { kitService } from "../services/kitService.js";
import "../public/css/Profile.css";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);
  const loading = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        kitService
          .getUserKits(user.uid)
          .then((kits) => {
            setKits(kits);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
        navigate("/404");
        setKits([]);
      }
    });

    return () => {
      authListener();
    };
  }, [navigate]);

  console.log(kits);

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
            <div className="center">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <p>No kits uploaded yet. Be the first to upload one!</p>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default Profile;
