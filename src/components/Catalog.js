import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { kitService } from "../services/kitService.js";
import "../public/css/Catalog.css";

export const Catalog = () => {
  const [kits, setKits] = useState([]);
  const [, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    kitService.getKits().then((data) => {
      setKits(data);
      setLoading(false);
    });

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
  }, [setUser]);

  const filteredKits = kits.filter((kit) =>
    kit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div className="container">
      <h1 className="h-one">Catalog</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredKits.length === 0 ? (
        <div className="center">
          {loading && !searchQuery ? <p>Loading...</p> : <p>No kits found!</p>}
        </div>
      ) : (
        <ul className="kits-grid">
          {filteredKits.map((kit) => (
            <li className="kit-details li-catalog" key={kit.id}>
              <div className="kit-pic-name">
                <h4 data-cy="cy-kit-name">{kit.name}</h4>
                <img src={kit.imageUrl} alt={kit.name} />
              </div>
              <div className="kit-buttons">
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  data-cy="cy-details-button"
                  onClick={() => kitService.handleDetailsKit(kit.id, navigate)}
                >
                  Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Catalog;