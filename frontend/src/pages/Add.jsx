import axios from "axios";
import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [menu, setMenu] = useState({
        id: null,
        food_name: "",
        food_desc: "",
        food_img: "",
        price: null,
    });

const navigate = useNavigate()

const handleChange=(e) => {
    setMenu((prev) => ({...prev, [e.target.name]: e.target.value}))
};

const handeClick= async e=>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/menu", menu)
        navigate("/menu")
    }catch(err){
        console.log(err)
    }
};
console.log(menu)
    return(
        <div className="form">
            <h1> Add New Item</h1>
            <input type="number" placeholder="ID" onChange={handleChange} name="id"/>
            <input type="text" placeholder="name" onChange={handleChange} name="food_name"/>
            <input type="text" placeholder="description" onChange={handleChange} name="food_desc"/>
            <input type="text" placeholder="image" onChange={handleChange} name="food_img"/>
            <input type="number" placeholder="price" onChange={handleChange} name="price"/>
        <button onClick={handeClick}>
            Add
        </button>
        </div>
    )
}

export default Add