import React, { useEffect, useState } from "react";
import axios from "axios"
import {Link, Route, Routes, useNavigate} from "react-router-dom"
import abimg from "./images/about.png"


const About = () =>{
    const Navigate = useNavigate()


    return(
        
        <div>
        
            <div>
                <header>
                    <nav class="navbar bg-dark navbar-expand-md justify-content-center text-center">
                        <div class="navbar-nav align-middle ">
                            <div class="navbar-brand fw-medium text-uppercase pe-md-5 me-md-5">
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/`} >The Smart Grocer</Link>
                            </div>
                            <div class="navbar text-uppercase fw-light ps-md-5 ms-md-5">
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/browse`} >Browse</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/login`} >Log in</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/membership`} >Membership</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover " to={`/about`} >About</Link>
                            </div>
                        </div>  
                    </nav>
                    <div class="container">
                        <div id="formcont2" class="row">
                            <div class="col-md-6">
                                <div class="overflow-y-scroll formcont">
                                    <div>
                                        <h2>About The Smart Grocer</h2>
                                        <p>
                                            Welcome to The Smart Grocer, your one-stop solution for all your grocery needs!
                                        </p>
                                        <p>
                                            At The Smart Grocer, we strive to provide our customers with a convenient and efficient way to shop for groceries online. Our mission is to make grocery shopping a seamless and enjoyable experience for everyone.
                                        </p>
                                        <p>
                                            Why choose The Smart Grocer?
                                        </p>
                                        <ul>
                                            <li>Wide Selection: We offer a diverse range of high-quality products, including fresh produce, pantry staples, and household essentials.</li>
                                            <li>Convenience: Enjoy the convenience of shopping from the comfort of your home. Simply browse our website or mobile app, place your order, and we'll deliver it to your doorstep.</li>
                                            <li>Quality Assurance: We are committed to providing the freshest and finest products. Our team carefully selects and inspects each item to ensure it meets our quality standards.</li>
                                            <li>Great Prices: We believe that quality groceries should be affordable. That's why we strive to offer competitive prices and frequent discounts to help you save on your shopping.</li>
                                        </ul>
                                        <p>
                                            Thank you for choosing The Smart Grocer. We look forward to serving you and making your grocery shopping experience smart, simple, and enjoyable!
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="formcont">
                                    <img class="img-fluid" src={abimg}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </header>
                <div>
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

export default About