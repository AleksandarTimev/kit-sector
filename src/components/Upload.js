import { useState } from 'react';
import { storage, db, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export const Upload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;
    try{
      const storageRef = ref(storage, `kits/${image.name}`);
      const imageRef = ref(storageRef, image.name);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      await addDoc(collection(db, "shirts"), {
        name,
        description,
        price,
        condition,
        imageUrl,
        userId: auth?.currentUser?.uid,
      });
      alert("Uploaded successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
<form onSubmit={handleSubmit} className="container-form">
  <div className="heading-one">
    <h1>Upload Kit</h1>
  </div>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" value={name} onChange={handleNameChange} className="form-control" required />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea id="description" value={description} onChange={handleDescriptionChange} className="form-control" required></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="price">Price:</label>
    <input type="number" id="price" value={price} onChange={handlePriceChange} className="form-control" required />
  </div>
  <div className="form-group">
    <label htmlFor="condition">Condition:</label>
    <select id="condition" value={condition} onChange={handleConditionChange} className="form-control" required>
      <option value="">Select Condition</option>
      <option value="new">New</option>
      <option value="old">Old</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="image">Image:</label>
    <input type="file" id="image" onChange={handleImageChange} className="form-control" required />
  </div>
  <button type="submit" className="btn btn-primary register">Upload</button>
</form>
  );
};

export default Upload;