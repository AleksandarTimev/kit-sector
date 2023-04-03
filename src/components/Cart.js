import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { cartService } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import "../public/css/Cart.css"

export function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [kits, setKits] = useState([]);

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
      <h1>My Cart:</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {kits.map((kit) => (
            <tr key={kit.id}>
              <td>{kit.name}</td>
              <td>{kit.description}</td>
              <td>{kit.price}</td>
              <td>
                <img src={kit.imageUrl} alt={kit.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
