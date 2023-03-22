import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { kitService } from "../services/kitService.js";
import "../public/css/Catalog.css";

export const Catalog = () => {
  const [kits, setKits] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    kitService.getKits().then((data) => setKits(data));
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="h-one">Catalog</h1>
      <ul className="kits-grid">
        {kits.map((kit) => (
          <li className="kit-details li-catalog" key={kit.id}>
            <div>
              <h4>{kit.name}</h4>
              <img src={kit.imageUrl} alt={kit.name} />
            </div>
            {user ? (
              <div className="kit-buttons">
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => kitService.handleDetailsKit(kit.id, navigate)}
                >
                  Details
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
