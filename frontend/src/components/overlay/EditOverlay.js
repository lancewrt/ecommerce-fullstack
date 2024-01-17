import React, { useState } from 'react';
import axios from 'axios';

const EditOverlay = ({ productId, productName, onClose }) => {
  const [quantity, setQuantity] = useState('');
  

  const handleInputChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      // Make an API call to update the quantity in the database
      await axios.put(`http://localhost:8800/api/update-quantity/${productId}`, { quantity });
      window.location.reload()

      // Close the overlay
      onClose();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className="edit-overlay">
      <h2 class="ps-5 pt-4">Edit Quantity</h2>
      <p class="ps-4 pe-4 fw-bold text-center pt-4 pb-2"> {productName} </p>
      <div class="d-flex justify-content-center">
        <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={handleInputChange}
        />
      </div>
      

      {/* Buttons for updating and closing the overlay */}
      <center>
        <button onClick={handleUpdate} class="btn btn-success ms-5 me-5 mt-5 mb-3">Update Quantity</button><br/>
        <button onClick={onClose} class="btn btn-info ms-5 me-5">Close</button>
      </center>
      
    </div>
  );
};

export default EditOverlay;
