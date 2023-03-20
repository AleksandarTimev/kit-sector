import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js"
import { kitService } from "../services/kitService.js";

export const Catalog = () => {
  const [kits, setKits] = useState([]);
  const [user, setUser] = useState(null);

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

  const handleDeleteKit = async (kitId) => {
    await kitService.deleteKit(kitId);
    setKits((prevKits) => prevKits.filter((kit) => kit.id !== kitId));
  };

  return (
    <div className="container">
      <h1>Catalog</h1>
      <ul>
        {kits.map((kit) => (
          <li key={kit.id}>
            <div className="row">
              <div className="col-6">
                <h4>{kit.name}</h4>
                <p>{kit.description}</p>
                <p>Price: {kit.price}</p>
                <p>Condition: {kit.condition}</p>
              </div>
              <div className="col-6">
                <img src={kit.image} alt={kit.name} width="100" height="100" />
                <div className="d-flex">
                  {user ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary mx-2"
                        onClick={() => handleDeleteKit(kit.id)}
                      >
                        Delete
                      </button>
                      <button type="button" className="btn btn-primary mx-2">
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