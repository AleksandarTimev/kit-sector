import React, { useState, useEffect } from "react";
import { kitService } from "../services/kitService.js";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

export const UploadForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/404');
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <form
      onSubmit={(event) =>
        kitService.handleSubmit(
          event,
          name,
          description,
          price,
          condition,
          image,
          navigate
        )
      }
      className="container-form"
    >
      <div className="heading-one">
        <h1 className="h-one">Upload</h1>
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          data-cy="cy-upload-name"
          placeholder="Real Madrid Home 19/20"
          value={name}
          onChange={(event) => kitService.handleNameChange(event, setName)}
          required
        />
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="form-control"
          data-cy="cy-upload-description"
          placeholder="Description here..."
          value={description}
          onChange={(event) =>
            kitService.handleDescriptionChange(event, setDescription)
          }
          required
        />
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="form-control"
          data-cy="cy-upload-price"
          placeholder="Set a price"
          value={price}
          onChange={(event) => kitService.handlePriceChange(event, setPrice)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="condition">Condition:</label>
        <select
          id="condition"
          value={condition}
          onChange={(event) =>
            kitService.handleConditionChange(event, setCondition)
          }
          className="form-control"
          data-cy="cy-upload-condition"
          required
        >
          <option value="">Select Condition</option>
          <option value="New" data-cy="cy-upload-condition-new">New</option>
          <option value="Old" data-cy="cy-upload-condition-old">Old</option>
        </select>
      </div>
      <div className="form-group" data-cy="cy-upload-image">
        <label className="navbar-nav ml-auto" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          className="form-control"
          onChange={(event) => kitService.handleImageChange(event, setImage)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary register" data-cy="cy-upload-btn">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
