import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./Overlay.css";
import EditOverlay from './EditOverlay';


Modal.setAppElement('#root');


function ItemList(){
    const [items, setItems] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/api/checkout/${username}`);
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

    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState(null);

    const openEditOverlay = (id, name) => {
        setProductId(id);
        setProductName(name)
        setShowEditOverlay(true);
      };
    
      const closeEditOverlay = () => {
        setShowEditOverlay(false);
      };
    
return (
        <div>
          <div class="row menulist ">
                        {items.map((list) =>(
                            <div  key={list.id} class="ps-3 pe-3 ">
                                
                                <p class="ps-4 pe-4 fw-bold"> {list.product_name} </p>
                                <div class="container">
                                  <div class="row align-items-center">
                                    <div class=" col">
                                      <span class="ps-4 pe-4 fw-light text-end"> ₱ {list.price}</span> 
                                      <span class="text-end pe-4 fst-italic"> x{list.quantity} </span>
                                    </div>
                                    <div class="col">
                                      <button className="update" class="btn btn-secondary me-2" onClick={() =>openEditOverlay(`${list.id}`, `${list.product_name}`)}>Edit</button>
                                      <button className="delete" class="btn btn-danger" onClick={()=>handleDelete(list.id)}> Remove</button>
                                    </div>
                                  </div>
                                </div>
                                <hr/>                                 
                            </div>))
                        }
                    </div>
                    {/* Render the edit overlay conditionally */}
                    {showEditOverlay && (
                        <EditOverlay productId={productId} productName={productName} onClose={closeEditOverlay} />
                    )}
                    
        </div>
    );
}

const CheckoutModal = ({ isOpen, closeModal }) => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const username = localStorage.getItem('username');
    

    useEffect(() => {
        fetchItems();
        calculateTotal();
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

      const calculateTotal = async () => {
        try {
          const response = await fetch(`http://localhost:8800/api/calculate-total/${username}`);
          const totalData = await response.json();
          setTotal(totalData);
        } catch (error) {
          console.error('Error calculating total:', error);
        }
      };

  const checkout = async () => {
    try {
        await axios.post(`http://localhost:8800/api/checkout/${username}`, { items })
        //console.log(response.data.message);
        setItems([]);
        setTotal("0") // Clear the cart in the frontend
        alert('Checkout successful');
        closeModal();
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Checkout Modal" className="ov_bg">
        <div className='ov_contCO'>
            <h2 class="ps-5 pt-4 sticky-top bg-dark">My Cart</h2>
            <ItemList/>
            
            <div class="fixed-bottom bg-dark container contbot ">
              <div class="align-items-center row ps-3 pe-3 pt-3">
                <div class="col">
                  <span class="fs-3 ps-4 pe-4">Total: {total}</span>
                </div>
                <div class="col d-flex justify-content-end">
                  <button onClick={checkout} class="btn btn-success me-2">Checkout</button>
                  <button onClick={closeModal} class="btn btn-secondary me-4">Close</button>
                </div>
              </div>
 
                
            </div>
        </div>
        
    </Modal>
  );
};

export default CheckoutModal;
