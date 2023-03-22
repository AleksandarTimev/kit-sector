import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase.js";
import { kitService } from "../services/kitService.js";

export const Details = () => {
  const [kit, setKit] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    kitService.getKitById(id).then((data) => setKit(data));
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
  }, [id]);

  const handleEditKit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      {kit ? (
        <div className="li-catalog">
          <h1>{kit.name}</h1>
          <img src={kit.imageUrl} alt={kit.name} width="600" height="600"/>
          <p>Price: ${kit.price}</p>
          <p>Condition: {kit.condition}</p>
          <p>Description: {kit.description}</p>
          {user && user.uid === kit.userId ? (
            <div className="kit-buttons">
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => kitService.handleDeleteKit(kit.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEditKit(kit.id)}
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
