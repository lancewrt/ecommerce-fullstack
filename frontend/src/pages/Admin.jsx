/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import blogo from "./images/blogo.png"
import AddItemModal from "../components/overlay/AddItemModal";
import EditProductModal from "../components/overlay/EditProductModal";
import { isAuthenticated } from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/Auth.js';


function ItemList({category}){
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
  
    const openModal = (productId) => {
      setSelectedProductId(productId);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedProductId(null);
      setIsModalOpen(false);
    };
  
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/grocery/${category}`);
            setItems(response.data);
          } catch (error) {
            console.error(`Error fetching ${category} items:`, error);
          }
        };
    
        fetchItems();
    }, [category]);

    const handleDelete= async(id)=>{
        try{
            await axios.delete("http://localhost:8800/product-delete/" +id)
            alert("Item deleted")
            window.location.reload()
    
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
          <div>
                <div class="adminmenulist row align-items-start">
                        {items.map((list) =>(
                                <div  key={list.id} class="adminfood row">
                                    <div class="col text-center">
                                        {list.image && <img src={require(`./images/grocery/${list.image}`)} alt="" class="adminprod_img"/>}
                                    </div>
                                    <div class="col-6">
                                        <span> {list.name} </span>
                                    </div>
                                    <div class="col">
                                        <span class="col"> ₱ {list.price}</span> 
                                    </div>
                                    <div class="col-3 text-center">
                                        <button class="btn btn-outline-warning me-1" onClick={() => openModal(list.id)} >Edit</button>
                                    
                                        <button class="btn btn-outline-danger" onClick={()=>handleDelete(list.id)}>Remove </button>
                                    </div>

                                </div>
                                     
                            ))
                        }
                </div>
            </div>
            
            <EditProductModal isOpen={isModalOpen} closeModal={closeModal} productId={selectedProductId}/>
        </div>
      );
}


const Grocery = () =>{     
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    
     

    useEffect(() => {
        if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        navigate('/login');
        }
    }, [navigate]);
    
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    const username = localStorage.getItem('username');
    


    return(
        <div>
            <div>
                <div class="header">
                    <nav class="navbar bg-dark navbar-expand-md justify-content-center text-center">
                        <div class="navbar-nav align-middle">
                            <div class="navbar-brand fw-medium text-uppercase pe-md-5 me-md-5">
                            <Link class="text-white text-decoration-none pe-3 texthover" to={`/admin`} ><img src={blogo} alt="" style={{width: 25}}/> &nbsp;The Smart Grocer</Link>
                            </div>
                            <div class="navbar text-uppercase fw-light ps-md-5 ms-md-5">
                                <span class="text-white ">Welcome, &nbsp;</span><span class="text-white me-5 fw-bold">{username}</span>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/`} onClick={logout}>Log out</Link>
                            </div>
                        </div>  
                    </nav>
                    
                    <div class="navbar text-uppercase menu row">
                        <div class="col">
                            <span class="navbar-brand fw-bold ps-5 ms-3">Administator </span>
                        </div>
                        <div class="col justify-content-end d-flex pe-5 me-4" >
                            <button class="btn btn-outline-light" onClick={() => setIsModalOpen(true)}>Add Product</button>
                            <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                        </div>    

                        
                    </div>
                    

                    <div class="itemcont row">
                        <div class="justify-content-center d-flex pt-4" >
                            <h2>Grocery </h2>
                        </div>      
                        <div>
                            <ItemList category="food" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" >
                            <h2>Pet Supplies </h2>
                        </div>      
                        <div>
                            <ItemList category="pet_sup" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" >
                            <h2>Hardware Supplies </h2>
                        </div>      
                        <div>
                            <ItemList category="hardware" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" >
                            <h2>Appliances </h2>
                        </div>      
                        <div>
                            <ItemList category="appliance" />
                        </div>


                    </div>

                   
                            
                
                <footer class="bg-dark text-white text-center py-3">
                    <div class="social-links">
                        
                        <a href="#" class="text-decoration-none"><i class="fab fa-facebook-f"></i> </a>
                        <a href="#" class="text-decoration-none"><i class="fab fa-twitter"></i> </a>
                        <a href="#" class="text-decoration-none"><i class="fab fa-instagram"></i> </a>
                        <a href="#" class="text-decoration-none"><i class="fab fa-pinterest"></i> </a>
                    </div>

                </footer>

                </div>
            </div>
        
        </div>
    )
}

export default Grocery