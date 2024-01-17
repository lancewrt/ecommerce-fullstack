import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./Overlay.css";

Modal.setAppElement('#root');

const CartModal = ({ isOpen, closeModal, productId, price }) => {
  const [quantity, setQuantity] = useState('');
  const username = localStorage.getItem('username');

  const addToCart = async () => {
    try {
      await axios.post('http://localhost:8800/api/add-to-cart', { productId, price, quantity, username });
      alert('Item added to cart successfully');
      window.location.reload()
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  return (
      

    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Checkout Modal" className="ov_bg">
    <div className='ov_cont'>

    
    <h2 class="ps-5 pt-4 bg-dark">Add to Cart</h2>
            <p class="ps-5 pe-5">Product Name: {productId}</p>
            <p class="ps-5 pe-5">Product Price: ₱  {price}</p>
            <label class="ps-5 pb-3">
              Quantity: &nbsp;
              <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              
            </label>
          
            <br/>
            <center >
              <button onClick={addToCart} class="addbut btn btn-success text-center">Add to Cart</button>
              <br/>
              <button onClick={closeModal} class="addbut btn btn-secondary text-center">Close</button>
            </center>

      </div>
    </Modal>
 
    
  );
};

export default CartModal;
