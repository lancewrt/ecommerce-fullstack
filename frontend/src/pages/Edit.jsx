import axios from "axios";
import React from "react";
import { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
    const [menu, setMenu] = useState({
        id:"",
        food_name: "",
        food_desc: "",
        food_img: "",
        price: null,
    });

const navigate = useNavigate();
const location = useLocation();
const menuId = location.pathname.split("/")[2]

const handleChange=(e) => {
    setMenu((prev) => ({...prev, [e.target.name]: e.target.value}))
};

const handeClick= async e=>{
    e.preventDefault()
    try{
        await axios.put(`http://localhost:8800/menu/${menuId}`, menu)
        navigate("/menu")
    }catch(err){
        console.log(err)
    }
};
console.log(menu)
    return(
        <div className="form">
            <h1> Edit Quantity</h1>
            <input type="text" placeholder="name" onChange={handleChange} name="food_name"/>
            <input type="text" placeholder="description" onChange={handleChange} name="food_desc"/>
            <input type="text" placeholder="image" onChange={handleChange} name="food_img"/>
            <input type="number" placeholder="price" onChange={handleChange} name="price"/>
        <button onClick={handeClick}>
            Edit
        </button>
        </div>
    )
}

export default Edit