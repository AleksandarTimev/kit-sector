import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { cartService } from "../services/cartService";
import { useNavigate, Link } from "react-router-dom";
import "../public/css/Cart.css";

export function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        cartService
          .fetchCart(user.uid)
          .then((kits) => {
            setKits(kits);
            console.log(kits);
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

  useEffect(() => {
    const totalPrice = kits.reduce((accumulator, kit) => {
      return accumulator + Number(kit.price);
    }, 0);
    setTotalPrice(totalPrice);
  }, [kits]);

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
      <div className="profile-kits">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Kit</th>
            </tr>
          </thead>
          <tbody>
            {kits.map((kit) => (
              <tr key={kit.id}>
                <td>
                  <Link className="row-cart" to={`/details/${kit.id}`}>
                    {kit.name}
                  </Link>
                </td>
                <td className="row-cart">{kit.description}</td>
                <td className="row-cart">${kit.price}</td>
                <td className="row-cart">
                  <img className="img-cart" src={kit.imageUrl} alt={kit.name} />
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td className="total-price-text">Total Price:</td>
              <td className="total-price-value">${totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn" onClick={()=> cartService.orderHandled()}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
