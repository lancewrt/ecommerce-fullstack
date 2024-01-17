import React, { useEffect, useState, useRef } from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import blogo from "./images/blogo.png"


const Grocery = () =>{
    const [menu, setMenu] = useState([])
    useEffect(()=>{
        const fetchAllMenu = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/grocery")
                setMenu(res.data)
            }catch(err){
                console.log(err)
            }
        
        }
        fetchAllMenu()
    }, []);

        
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null); 
    const section4Ref = useRef(null);
    
    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return(
        <div>
            <div>
                <div class="header">
                    <nav class="navbar bg-dark navbar-expand-md justify-content-center text-center">
                        <div class="navbar-nav align-middle">
                            <div class="navbar-brand fw-medium text-uppercase pe-md-5 me-md-5">
                            <Link class="text-white text-decoration-none pe-3 texthover" to={`/`} ><img src={blogo} alt="" style={{width: 25}}/> &nbsp;The Smart Grocer</Link>
                            </div>
                            <div class="navbar text-uppercase fw-light ps-md-5 ms-md-5">
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/login`} >Log in</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/membership`} >Membership</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/about`} >About</Link>
                            </div>
                        </div>  
                    </nav>
                    <div class="navbar text-uppercase menu">
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section1Ref)}>Grocery</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section2Ref)}>Pet supplies</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section3Ref)}>Hardware supplies</Link>
                        <Link class="text-white text-decoration-none pe-3 texthover" onClick={() => scrollToSection(section4Ref)}>Appliances</Link>
                    </div>
                   
                    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img src={require("./images/carousel/car1.jpg")} class="d-block w-90 m-auto" alt="..."/>
                            </div>
                        </div>
                    </div>

                    <div class="justify-content-center d-flex pt-4" ref={section1Ref}>
                        <h2>Grocery </h2>
                    </div>      
                    <div class="row menulist">
                        {menu.map((list) =>(
                            <div  key={list.id} class="col-lg-3 col-md-6 ps-3 pe-3 food">
                                {list.image && <img src={require(`./images/grocery/${list.image}`)} alt="" className="prod_img"/>}
                                <p> {list.name} </p>
                                        
                                <span> ₱ {list.price}</span> <button>Add to Cart</button>      
                            </div>))
                        }
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