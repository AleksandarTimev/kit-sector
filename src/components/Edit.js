import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { kitService } from "../services/kitService.js";

export const EditForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    kitService.getKitById(id).then((kit) => {
      setName(kit.name);
      setDescription(kit.description);
      setPrice(kit.price);
      setCondition(kit.condition);
      setImage(kit.image);
    });
  }, [id]);

  return (
    <form
      onSubmit={(event) =>
        kitService.handleEditSubmit(
          event,
          id,
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
        <h1 className="h-one">Edit</h1>
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
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
          required
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Old">Old</option>
        </select>
      </div>
      <div className="form-group">
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
      <button type="submit" className="btn btn-primary register">
        Save
      </button>
    </form>
  );
};

export default EditForm;