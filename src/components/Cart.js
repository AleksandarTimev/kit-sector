import React, { useState, useEffect } from "react";
import { cartService } from "../services/cartService";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's shopping cart from Firestore
        const fetchCart = async () => {
          const userRef = doc(db, "users", user.uid);
          const userData = await getDoc(userRef);
          if (userData.exists()) {
            const userCart = userData.data()?.shoppingCart || [];
            setCart(userCart);
          } else {
            setCart([]);
          }
        };
        fetchCart();
      } else {
        setCart([]);
      }
    });

    return unsubscribe;
  }, []);

  const handleRemoveFromCart = async (kitId) => {
    const user = auth.currentUser;
    if (user) {
      await cartService.removeFromCartHandler(kitId, user, setCart);
    }
  };

  return (
    <div className="container">
    <div className="profile-pic">
      <h2>Shopping Cart</h2>
      <img
        src="https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Image-File.png"
        alt="Cart"
        width="75"
        height="65"
      />
      {user && <p>Email: {user.email}</p>}
    </div>
    <div className="profile">
      <div className="avatar"></div>
      <div className="profile-kits">
        <h3>Your Cart:</h3>
        {cart.length > 0 ? (
          <ul className="kits-grid">
            {cart.map((kitId) => (
              <li className="kit-details li-catalog" key={kitId}>
                <div>
                  <h4>Kit {kitId}</h4>
                </div>
                <div className="kit-buttons">
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    onClick={() => handleRemoveFromCart(kitId)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="center">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default Cart;