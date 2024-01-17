import express from "express"
import mysql from "mysql"
import cors from "cors"
import bcrypt from "bcrypt"
import bodyParser from "body-parser"

const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"lncbrnl5",
    database:"webdevdb"
})
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("this is the backend")
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ message: 'Login failed' });
      } else {
        if (results.length > 0) {
          const match = await bcrypt.compare(password, results[0].password);
          if (match) {
            res.status(200).json({ message: 'Login successful' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        } else {
          res.status(401).json({ message: 'User not found' });
        }
      }
    });
  });


app.post("/users", (req, res)=>{

    const q = "insert into users (`username`, `email`, `password`) values(?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ];
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("data successfully inserted")
    })
})

app.delete("/menu/:id", (req, res) => {
    const menuID = req.params.id;
    const q = "DELETE FROM menu WHERE id=?"

    db.query(q, [menuID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("data successfully deleted")
    })
})

app.put("/menu/:id", (req, res) => {
    const menuID = req.params.id;
    const q = "UPDATE menu SET `food_name`=?, `food_desc`=?, `food_img`=?, `price` =? WHERE id=?"
    const values = [
        req.body.food_name,
        req.body.food_desc,
        req.body.food_img,
        req.body.price,
    ];

    db.query(q, [...values, menuID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Item is successfully updated")
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend hahaha")
})

