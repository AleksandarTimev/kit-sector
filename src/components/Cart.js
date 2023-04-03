import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { cartService } from "../services/cartService";

export function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's shopping cart from Firestore
        cartService.fetchCart(user, setCart, setKits);
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

  // Calculate the total price of all kits in the cart
  // const totalPrice = Object.values(kits).reduce((total, kit) => {
  //   return total + kit.price;
  // }, 0);

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
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Remove from Cart</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((kitId) => {
                  const kit = kits[kitId];
                  if (!kit) return null;
                  return (
                    <tr key={kitId}>
                      <td>
                        <img src={kit.image} alt="Kit" width="100" height="100" />
                      </td>
                      <td>{kit.name}</td>
                      <td>${kit.price.toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary mx-2"
                          onClick={() => handleRemoveFromCart(kitId)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>$20.00</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Your cart is empty!</p>
          )}
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;