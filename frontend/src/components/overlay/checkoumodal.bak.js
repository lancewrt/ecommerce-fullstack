import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {Link} from "react-router-dom"
import "./Overlay.css";


Modal.setAppElement('#root');

const SecondOverlay = ({ data, onClose }) => {
    // Component logic for the second overlay goes here
  
    return (
      <div className="second-overlay">
        {/* Render the content of the second overlay using the data */}
        <h2>{data.title}</h2>
        <p>{data.description}</p>
  
        {/* Close button */}
        <button onClick={onClose}>Close Second Overlay</button>
      </div>
    );
  };




function ItemList(){
    const [items, setItems] = useState([]);

    const [showSecondOverlay, setShowSecondOverlay] = useState(false);
    const [secondOverlayData, setSecondOverlayData] = useState({});

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/api/checkout`);
            setItems(response.data);
          } catch (error) {
            console.error(`Error fetching items:`, error);
          }
        };
    
        fetchItems();
    }, []);

    const handleDelete= async(id)=>{
        try{
            await axios.delete("http://localhost:8800/cart/" +id)
            window.location.reload()
            CheckoutModal(true)
    
        }catch(err){
            console.log(err)
        }
    }

    const openSecondOverlay = () => {
        setShowSecondOverlay(true);
      };
    
      const closeSecondOverlay = () => {
        setShowSecondOverlay(false);
      };
    

return (
        <div>
          <div class="row menulist ">
                        {items.map((list) =>(
                            <div  key={list.id} class="ps-3 pe-3 ">
                                
                                <p class="ps-4 pe-4 fw-bold"> {list.product_name} </p>
                                <span class="ps-4 pe-4 fw-light text-end"> ₱ {list.price}</span> 
                                <span class="text-end pe-4 fst-italic"> x{list.quantity} </span>
                                <button className="update" class="btn ps-5 pe-5" ><Link to={`/edit/${list.id}`} class="text-decoration-none">Edit</Link></button>
                                <button className="delete" class="btn btn-danger" onClick={()=>handleDelete(list.id)}> Remove</button>
                                <hr/>
                                  
                            </div>))
                        }
                    </div>
        </div>
    );
}

const CheckoutModal = ({ isOpen, closeModal }) => {


  const checkout = async () => {
    try {
      await axios.post('http://localhost:8800/api/checkout');
      alert('Checkout successful');
      closeModal();
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Checkout Modal" className="ov_bg">
    <div className='ov_contCO'>
    <h2 class="ps-5 pt-4">My Cart</h2>
      <ItemList/>
      
      </div>
    </Modal>
  );
};

export default CheckoutModal;
