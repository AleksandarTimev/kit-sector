import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { cartService } from "../services/cartService";
import { useNavigate, Link } from "react-router-dom";
import "../public/css/Cart.css";

export function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        cartService
          .fetchCart(user.uid)
          .then((cart) => {
            setCart(cart);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else {
        setUser(null);
        navigate("/404");
        setCart([]);
        setLoading(false);
      }
    });

    return () => {
      authListener();
    };
  }, [navigate]);

  useEffect(() => {
    const totalPrice = cart.reduce((accumulator, kit) => {
      return accumulator + Number(kit.price);
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart]);

  const removeFromCart = async (kitId) => {
    await cartService.removeFromCartHandler(kitId, user, setCart);
  };

  return (
    <div className="container">
      <div>
        <h2>Shopping Cart</h2>
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Image-File.png"
          alt="Cart"
          width="75"
          height="65"
        />
        {user && <p>Email: {user.email}</p>}
      </div>
      <div className="cart-kits" data-cy="cy-cart">
        {loading ? (
          <p>Loading...</p>
        ) : cart.length === 0 ? (
          <p data-cy="cy-cart-empty">Your cart is empty!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Kit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((kit) => (
                <tr key={kit.id}>
                  <td>
                    <Link
                      className="row-cart"
                      data-cy="cy-cart-name"
                      to={`/details/${kit.id}`}
                    >
                      {kit.name}
                    </Link>
                  </td>
                  <td className="row-cart" data-cy="cy-cart-description">
                    {kit.description}
                  </td>
                  <td className="row-cart" data-cy="cy-cart-price">
                    ${kit.price}
                  </td>
                  <td className="row-cart">
                    <img
                      className="img-cart"
                      src={kit.imageUrl}
                      alt={kit.name}
                      data-cy="cy-cart-img"
                    />
                  </td>
                  <td>
                    <button
                      data-cy="cy-remove-item"
                      className="btn btn-danger"
                      onClick={() => removeFromCart(kit.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="total-price-text">Total Price:</td>
                <td className="total-price-value">${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        )}
        {cart.length === 0 ? null : (
          <button
            className="btn"
            data-cy="cy-cart-checkout"
            onClick={() => cartService.orderHandled(user, setCart)}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
