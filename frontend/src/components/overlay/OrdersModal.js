import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./Overlay.css";


Modal.setAppElement('#root');


function ItemList(){
    const [items, setItems] = useState([]);
    const cancelled = "cancelled";
    const completed = "completed"
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/api/orders/${username}`);
            setItems(response.data);
          } catch (error) {
            console.error(`Error fetching items:`, error);
          }
        };
    
        fetchItems();
    }, []);

    const handleUpdate = async(id, status) => {
        
        console.log(status)
        try{
            await axios.put(`http://localhost:8800/api/orders/${id}`, {status})
            window.location.reload()
            CheckoutModal(true)
        }catch(err){
            console.log(err)
        }
    }

   
   
return (
        <div>
          <div class="row menulist ">
                        {items.map((list) =>(
                            <div  key={list.id} class="ps-3 pe-3 ">
                                
                                <p class="ps-4 pe-4 fw-bold"> {list.item_name} </p>
                                <div class="container">
                                  <div class="row align-items-center">
                                    <div class=" col">
                                      <span class="ps-4 pe-4 fw-light text-end"> ₱ {list.price}</span> 
                                      <span class="text-end pe-4 fst-italic"> x{list.quantity} </span><br/>
                                      <span class="text-end ps-4 pe-4 fst-italic"> Status: {list.status} </span>
                                    </div>
                                    <div class="col">
                                      <button className="delete" class="btn btn-outline-success btn-sm " onClick={()=>handleUpdate(`${list.transaction_id}`, completed)}>Order Received</button>
                                      <button className="delete" class="btn btn-outline-danger btn-sm" onClick={()=>handleUpdate(`${list.transaction_id}`,cancelled)}>Cancel</button>
                                    </div>
                                  </div>
                                </div>
                                <hr/>                                 
                            </div>))
                        }
                    </div>
                    
                    
        </div>
    );
}

const CheckoutModal = ({ isOpen, closeModal }) => {
    const [items, setItems] = useState([]);
    

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
          const response = await fetch('http://localhost:8800/api/items');
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

      

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Checkout Modal" className="ov_bg">
        <div className='ov_contCO'>
            <h2 class="ps-5 pt-4 sticky-top bg-dark">My Orders</h2>
            <ItemList/>
            
            
        </div>
        
    </Modal>
  );
};

export default CheckoutModal;
