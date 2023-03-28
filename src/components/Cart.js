import { useState } from "react";
import { cartService } from "../services/cartService.js";
import "../public/css/Profile.css";

export const Cart = () => {
  const [cartItems, setCartItems] = useState(cartService.getCartItems());

  const handleRemoveItem = (itemId) => {
    cartService.removeFromCart(itemId);
    setCartItems(cartService.getCartItems());
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    // Add logic to process payment and clear cart
    alert(`Total amount: $${total}. Payment processed successfully.`);
    cartService.clearCart();
    setCartItems([]);
  };

  const handleClearCart = () => {
    cartService.clearCart();
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          <ul className="cart-items-grid">
            {cartItems.map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="item-quantity">
                    Quantity: {item.quantity}
                  </div>
                  <div className="item-price">
                    Price: ${item.price * item.quantity}
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Total: ${cartTotal}</p>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;