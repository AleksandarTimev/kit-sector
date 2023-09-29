import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase.js";
import { kitService } from "../services/kitService.js";
import { likeService } from "../services/likeService.js";
import { cartService } from "../services/cartService.js";
import "../public/css/Details.css";

export const Details = () => {
  const [kit, setKit] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
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

  const removeFromCart = async (kitId) => {
    await cartService.removeFromCartHandler(kitId, user, setCart);
    kitService.getKitById(id).then((data) => setKit(data));
  };

  return (
    <div className="container">
      {kit ? (
        <div className="li-catalog">
          <h1  data-cy="cy-kit-name-details">{kit.name}</h1>
          <img src={kit.imageUrl} alt={kit.name} width="600" height="600" />
          <p>Price: ${kit.price}</p>
          <p>Condition: {kit.condition}</p>
          <p>Description: {kit.description}</p>
          <p>Likes: {kit.userLikes?.length || 0}</p>
          {user && user.uid === kit.userId ? (
            <div className="kit-buttons">
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => kitService.handleDeleteKit(kit.id, navigate)}
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
          {user && user.uid !== kit.userId ? (
            <div className="kit-buttons">
              {cart.find((item) => item.id === kit.id) ? (
                <button
                  type="button"
                  className="btn btn-secondary cart-btn"
                  onClick={() => removeFromCart(kit.id)}
                >
                  <img
                    className="like-given border-0"
                    src="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/cart-remove-icon.png"
                    alt="RemoveCart"
                    width="75"
                    height="75"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary cart-btn"
                  onClick={() => cartService.addToCartHandler(kit.id, user, setCart, setKit)}
                >
                  <img
                    className="like-given border-0"
                    src="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/cart-add-icon.png"
                    alt="AddCart"
                    width="75"
                    height="75"
                  />
                </button>
              )}
              {kit.userLikes && kit.userLikes.includes(user.uid) ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    likeService.dislikeHandler(kit.id, user, setKit)
                  }
                >
                  <img
                    className="like-given border-0"
                    src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/dislike-icon.png"
                    alt="Dislike"
                    width="75"
                    height="75"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => likeService.likeHandler(kit.id, user, setKit)}
                >
                  <img
                    className="like-given border-0"
                    src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/like-icon.png"
                    alt="Like"
                    width="75"
                    height="75"
                  />
                </button>
              )}
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
