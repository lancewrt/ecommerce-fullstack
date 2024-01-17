// EditProductModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility

const EditProductModal = ({ isOpen, closeModal, productId, onProductUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: 0,
    imageName: '',
  });
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    // Fetch the product details when the modal opens
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/products/${productId}`);
        setEditedProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (isOpen) {
      fetchProductDetails();
    }
  }, [isOpen, productId]);


  const handleSave = async () => {
    try {
      // Send updated product details to the backend
      const response = await axios.put(`http://localhost:8800/api/edit-product/${productId}`, {name,price,image,category});

      if (response.data.success) {
        // Close the modal and trigger the parent's update callback
        closeModal();
        alert("Item updated successfully")
        window.location.reload()
      } else {
        console.error('Failed to save product.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="ov_bg">
      <div className='adminov_contCO'>
          <h2 class="ps-5 pt-3 sticky-top bg-dark">Edit Product</h2>
          <div class="ps-5">
            <p class="fst-italic">{editedProduct.name}</p>
            <p class="fst-italic">₱ {editedProduct.price}</p>
          </div>
          
          <div class="ms-5 ">
            
            <p>Name:</p>
            <input class="w-75" type="text" name="name"  value={name} onChange={(e) => setName(e.target.value)} />

            <p>Price:</p>
            <input class="w-75" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <p>Image Name:</p>
            <input class="w-75" type="text" name="imageName" value={image} onChange={(e) => setImage(e.target.value)} />

            <p>Category:</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">--Select Category--</option>
              <option value="food">Food</option>
              <option value="pet_sup">Pet Supply</option>
              <option value="hardware">Hardware</option>
              <option value="appliance">appliance</option>
            </select>


            <div class="col d-flex justify-content-end me-4 mt-2 pt-3">
                    <button onClick={handleSave} class="btn btn-success me-2">Update Product</button>
                    <button onClick={closeModal} class="btn btn-secondary me-4">Cancel</button>
            </div>

          </div>
          
      </div>
      
    </Modal>
  );
};

export default EditProductModal;
