import React, { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

const Menu = () =>{

    const [menu, setMenu] = useState([])
    useEffect(()=>{
        const fetchAllMenu = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/Menu")
                setMenu(res.data)
            }catch(err){
                console.log(err)
            }
        
        }
        fetchAllMenu()
    }, []);

const handleDelete= async(id)=>{
    try{
        await axios.delete("http://localhost:8800/menu/" +id)
        window.location.reload()

    }catch(err){
        console.log(err)
    }
}

    return(
        <div>
            <h1>Marketplace</h1>
            <div className="menulist">
                {menu.map((food) =>(
                    <div className="food" key={food.id}>
                        {food.food_img && <img src={food.food_img} alt=""/>}
                        <h2> {food.food_name} </h2>
                        <p> {food.food_desc} </p>
                        <span> {food.price}</span>
                        <button className="update"><Link to={`/update/${food.id}`} >Update</Link></button>
                        <button className="delete" onClick={()=>handleDelete(food.id)}> Delete</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to={"/add"}>Add new item</Link>
            </button>

        </div>
    )
}

export default Menu