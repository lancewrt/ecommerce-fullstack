/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import axios from "axios"
import {Link} from "react-router-dom"


const Login = () =>{
    //const Navigate = useNavigate()
    //const isLoggedin = true;
    const [usernamelogin, setusernamelogin] = useState('');
    const [passwordlogin, setPasswordlogin] = useState('');
    const loginData = { username: '', password: '' };
    
    const handleLogin = async () => {
        loginData.username = usernamelogin;
        loginData.password = passwordlogin;
        //setLoginData((loginData) => ({...loginData, username:usernamelogin, password:passwordlogin}))
        console.info(loginData)
        try {
            const response = await axios.post('http://localhost:8800/login', loginData);
            console.log(response.data);
            const token = 'sampleToken';
            localStorage.setItem('token', token);
            localStorage.setItem('username', loginData.username);
            console.log(response.data.acc_type)
            if (response.data.acc_type === "admin"){
                window.location.href = '/admin'
                localStorage.setItem('acc_type', "admin");
            }
            else{
                window.location.href = '/browse'
                localStorage.setItem('acc_type', "user");
            }
            
        } catch (error) {
            console.error('Login failed:', error.message);
            alert("Invalid Credentials / User does not exist")
        }
    };


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
                                <Link class="text-white text-decoration-none pe-3 texthover" to={`/about`} >About</Link>
                            </div>
                        </div>  
                    </nav>
                    <div>
                        <div id="loginform" class="textfield">
                            <form name="account">
                                <h2>Log in</h2>
                                <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="username" class="form-control" id="username" aria-describedby="usernameHelp" required value={usernamelogin} onChange={(e) => setusernamelogin(e.target.value)}/>
                                </div>

                                <div class="mb-3">
                                <label for="Pass" class="form-label">Password</label>
                                <input type="password" class="form-control" id="Pass" aria-describedby="passHelp" required value={passwordlogin} onChange={(e) => setPasswordlogin(e.target.value)}/>
                                </div>

                                <button type="button" class="btn btn-primary" onClick={handleLogin} value="try">Log in</button>
                            </form>
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

export default Login