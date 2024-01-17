/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import blogo from "./images/blogo.png"
import CartModal from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/CartModal.js';
import CheckoutModal from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/CheckoutModal.js';
import OrdersModal from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/OrdersModal.js';
import { isAuthenticated } from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/Auth.js';


function ItemList({category}){
    const [items, setItems] = useState([]);

    const [isCartModalOpen, setCartModalOpen] = useState(false);
    
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProductPrice, setSelectedProducPrice] = useState(null);

    const openCartModal = (productId, price) => {
        setCartModalOpen(true);
        setSelectedProductId(productId);
        setSelectedProducPrice(price);
    };

    const closeCartModal = () => {
        setCartModalOpen(false);
        setSelectedProductId(null);
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

    return (
        <div>
          <div >
                <div class="row menulist">
                        {items.map((list) =>(
                            <div class="col-lg-3 col-md-4 ">
                                <div  key={list.id} class="ps-3 pe-3 food m-auto">
                                    {list.image && <img src={require(`./images/grocery/${list.image}`)} alt="" className="prod_img"/>}
                                    <p> {list.name} </p>
                                    <p class="fw-light"> ₱ {list.price}</p> 
                                    <Link class="addbut btn btn-success text-center mb-2" onClick={() => openCartModal(`${list.name}`, `${list.price}`)}>Add to Cart</Link>   
                                    <CartModal isOpen={isCartModalOpen} closeModal={closeCartModal} productId={selectedProductId} price={selectedProductPrice}/>
                                    
                                </div>
                            </div>
                            
                            
                            ))
                        }
                </div>
                        
            </div>
        </div>
      );
}


const Grocery = () =>{     
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null); 
    const section4Ref = useRef(null);
    

    const navigate = useNavigate();

    useEffect(() => {
        const acc_type = localStorage.getItem("acc_type")
        if (!isAuthenticated()) {
        // Redirect to login if not authenticat
        navigate('/login');
        }
        else{
            if(acc_type === "admin"){
                navigate("/admin")
            }
        }
    }, [navigate]);
    
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }
    
    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
    const openCheckoutModal = () => setCheckoutModalOpen(true);
    const closeCheckoutModal = () => setCheckoutModalOpen(false);

    const [isOrdersModalOpen, setOrdersModalOpen] = useState(false);
    const openOrdersModal = () => setOrdersModalOpen(true);
    const closeOrdersModal = () => setOrdersModalOpen(false);

    const username = localStorage.getItem('username');
    


    return(
        <div>
            <div>
                <div class="header">
                    <nav class="navbar bg-dark navbar-expand-md justify-content-center text-center">
                        <div class="navbar-nav align-middle">
                            <div class="navbar-brand fw-medium text-uppercase pe-md-5 me-md-5">
                            <Link class="text-white text-decoration-none pe-3 texthover" to={`/browse`} ><img src={blogo} alt="" style={{width: 25}}/> &nbsp;The Smart Grocer</Link>
                            </div>
                            <div class="navbar text-uppercase fw-light ps-md-5 ms-md-5">
                                <span class="text-white ">Welcome, &nbsp;</span><span class="text-white me-5 fw-bold">{username}</span>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/`} onClick={logout}>Log out</Link>
                            </div>
                        </div>  
                    </nav>
                    
                    <div class="navbar text-uppercase menu sticky-top">
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section1Ref)}>Grocery</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section2Ref)}>Pet supplies</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section3Ref)}>Hardware supplies</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section4Ref)}>Appliances</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={openCheckoutModal}>Cart</Link>
                        <CheckoutModal isOpen=    {isCheckoutModalOpen} closeModal={closeCheckoutModal} /> 
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={openOrdersModal}>Orders</Link>
                        <OrdersModal isOpen=    {isOrdersModalOpen} closeModal={closeOrdersModal} /> 
                    </div>
                   
                    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img src={require("./images/carousel/car1.jpg")} class="d-block m-auto" alt="..."/>
                            </div>
                        </div>
                    </div>

                    

                    <div class="itemcont row">
                        <div class="justify-content-center d-flex pt-4" ref={section1Ref}>
                            <h2>Grocery </h2>
                        </div>      
                        <div>
                            <ItemList category="food" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" ref={section2Ref}>
                            <h2>Pet Supplies </h2>
                        </div>      
                        <div>
                            <ItemList category="pet_sup" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" ref={section3Ref}>
                            <h2>Hardware Supplies </h2>
                        </div>      
                        <div>
                            <ItemList category="hardware" />
                        </div>

                        <div class="justify-content-center d-flex pt-4" ref={section4Ref}>
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