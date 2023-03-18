import { useState } from 'react';
import { storage, firestore } from '../firebase';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`football-kits/${image.name}`);
    imageRef.put(image).then(() => {
      imageRef.getDownloadURL().then((url) => {
        firestore.collection('football-kits').add({
          name,
          description,
          price,
          condition,
          imageUrl: url,
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <label htmlFor="condition">Condition:</label>
        <input type="text" id="condition" value={condition} onChange={handleConditionChange} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;