import React, { useState } from 'react';
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

Modal.setAppElement('#root'); // Specify the root element for accessibility

const AddItemModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageName, setImageName] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleAddItem = async () => {
    try {
      console.info(category)
      // Send the new item data to the backend
      const response = await axios.post('http://localhost:8800/api/add-product', {
        name,
        imageName,
        price,
        category,
      });

      if (response.data.success) {
        // Notify the parent component that a new item has been added
        // Close the modal
        onClose();
        alert("Item added successfully")
        window.location.reload()
      } else {
        console.error('Failed to add new item');
      }
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="ov_bg">
        <div className='adminov_contCO'>
          <h2 class="ps-5 pt-4 sticky-top bg-dark">Add New Product</h2>
          <div class="ms-5 mt-5 ">
            <p class="">Name:</p>
            <input class="w-75" type="text" value={name} onChange={(e) => setName(e.target.value)} /> 

            <p>Price:</p>
            <input class="w-75" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /> 

            <p>Image:</p>
            <input class="w-75" type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} /> 

            <p>Category:</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">--Select Category--</option>
              <option value="food">Food</option>
              <option value="pet_sup">Pet Supply</option>
              <option value="hardware">Hardware</option>
              <option value="appliance">appliance</option>
            </select>

            <div class="col d-flex justify-content-end me-4 mt-4">
                    <button onClick={handleAddItem} class="btn btn-success me-2">Add Item</button>
                    <button onClick={onClose} class="btn btn-secondary me-4">Cancel</button>
            </div>
          </div>
          
        </div>
      
    </Modal>
  );
};

export default AddItemModal;
