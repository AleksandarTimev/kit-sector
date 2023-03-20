import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { kitService } from "../services/kitService.js";
import "../public/css/Catalog.css"

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

  const handleEditKit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
    <h1 className="h-one">Catalog</h1>
    <ul>
      {kits.map((kit) => (
        <li className= "li-catalog" key={kit.id}>
          <div className="row">
            <div className="col-6">
              <h4>{kit.name}</h4>
              <p>Price: ${kit.price}</p>
              <p>Condition: {kit.condition}</p>
              <p>Description: {kit.description}</p>
            </div>
            <div className="col-3 d-flex flex-column justify-content-between align-items-center">
              <div>
                <img
                  src={kit.imageUrl}
                  alt={kit.name}
                  width="100"
                  height="100"
                />
              </div>
              <div className="d-flex justify-content-center">
                {user ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => kitService.handleDeleteKit(kit.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mx-2"
                      onClick={() => handleEditKit(kit.id)}
                    >
                      Edit
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Catalog;