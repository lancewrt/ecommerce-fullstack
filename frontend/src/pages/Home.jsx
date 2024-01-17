/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect}  from "react";
import {Link} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { isAuthenticated } from 'C:/ITSHIZZ/WEBDEV/webdev_proj/frontend/src/components/overlay/Auth.js';


const Home = () =>{
    const navigate = useNavigate();

    useEffect(() => {
        const acc_type = localStorage.getItem("acc_type")
        if (!isAuthenticated()) {
        // Redirect to login if not authenticat
        navigate('/');
        }
        else{
            if(acc_type === "admin"){
                navigate("/admin")
            }
            else{
                navigate("/browse")
            }
        }
    }, [navigate]);

    return(
        <div>
            <div>
                <header>
                    <nav class="navbar bg-dark navbar-expand-md justify-content-center text-center">
                        <div class="navbar-nav align-middle">
                            <div class="navbar-brand fw-medium text-uppercase pe-md-5 me-md-5">
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/`} >The Smart Grocer</Link>
                            </div>
                            <div class="navbar text-uppercase fw-light ps-md-5 ms-md-5">
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/browse`} >Browse</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/login`} >Log in</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/membership`} >Membership</Link>
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/about`} >About</Link>
                            </div>
                        </div>  
                    </nav>
                    <div class="banner text-white m-auto text-center">
                        <h1 class="display-2 fw-semibold shadow-lg ">The Smart Grocer</h1>
                        <p class="fw- py-2 shadow fs-4 fst-italic fw-light"><mark>"Where everything is new."</mark></p>
                     
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

export default Home