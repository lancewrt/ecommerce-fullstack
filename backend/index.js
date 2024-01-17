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

app.get("/grocery", (req, res)=>{
  const q = "select * from grocery"
  db.query(q, (err, data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.get('/grocery/:category', (req, res) => {
  const category = req.params.category;
  const query = `SELECT * FROM grocery WHERE category = ?`;

  db.query(query, [category], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/add-to-cart', (req, res) => {
  const { productId, price, quantity, username } = req.body;

  const addToCartQuery = 'INSERT INTO cart (product_name, price, quantity, username) VALUES (?, ?, ?, ?)';
  db.query(addToCartQuery, [productId, price, quantity, username], (error, results) => {
    if (error) {
      console.error('Error adding item to cart:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  });
});

app.get("/api/checkout/:username", (req, res)=>{
  const username = req.params.username;
  const q = "select * from cart WHERE username = ?";
  db.query(q, [username], (err, data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.post('/api/checkout/:username', (req, res) => {
  const { items } = req.body;
  const username = req.params.username;

  // Assuming you have a 'cart' table in your database
  const insertTransactionQuery = 'INSERT INTO transactions (username, item_name, quantity, price, total) VALUES (?, ?, ?, ?, ?)';

  const clearCartQuery = 'DELETE FROM cart WHERE username = ?';

  // Begin a transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Transaction failed to start.' });
    }

    // Insert each item in the cart into the 'transactions' table
    items.forEach(async (item) => {
      const { product_name, quantity, price } = item;
      const totalPrice =  item.quantity * item.price;
      try {
        if(item.username === username){
          await db.query(insertTransactionQuery, [username, product_name, quantity, price, totalPrice]);
        }
        
      } catch (error) {
        db.rollback(() => {
          res.status(500).json({ error: 'Error inserting transaction data.' });
        });
      }
    });

    // Clear the cart
    db.query(clearCartQuery, [username], (err, results) => {
      if (err) {
        db.rollback(() => {
          res.status(500).json({ error: 'Error clearing cart.' });
        });
      }

      // Commit the transaction
      db.commit((err) => {
        if (err) {
          db.rollback(() => {
            res.status(500).json({ error: 'Transaction failed to commit.' });
          });
        }

        res.status(200).json({ message: 'Transaction recorded successfully and cart cleared.' });
      });
    });
  });
});

app.get("/api/orders/:username", (req, res)=>{
  const username = req.params.username;
  const q = "select * from transactions WHERE status = 'pending' AND username = ?";
  db.query(q, [username], (err, data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
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
            res.status(200).json({ message: 'Login successful' , acc_type: results[0].acc_type});
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        } else {
          res.status(401).json({ message: 'User not found' });
        }
      }
    });
  });


app.post("/users", async (req, res)=>{
    const q = "insert into users (`username`, `email`, `password`) values(?)";
    const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    ];
    try {
      // Check if the username already exists
      db.query('SELECT * FROM users WHERE username = ?', [req.body.username], async (err, results) => {
        if (err) {
          console.error('Error checking existing user:', err);
          res.status(500).json({ message: 'Registration failed' });
        } else {
          if (results.length > 0) {
            res.status(409).json({ message: 'Username already exists' });
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
            db.query(
              'INSERT INTO users (username, email, password) VALUES (?,?,?)',
              [req.body.username, req.body.email, hashedPassword],
              (err) => {
                if (err) {
                  console.error('Error registering user:', err);
                  res.status(500).json({ message: 'Registration failed' });
                } else {
                  res.status(200).json({ message: 'Registration successful' });
                }
              }
            );
          }
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
})


app.delete("/cart/:id", (req, res) => {
    const menuID = req.params.id;
    const q = "DELETE FROM cart WHERE id=?"

    db.query(q, [menuID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("data successfully deleted")
    })
})

app.put('/api/orders/:productId', (req, res) => {
  const transaction_id = req.params.productId;
  const status = req.body.status;

  const query = "UPDATE transactions SET status = ? WHERE transaction_id = ?";
  
  db.query(query, [status, transaction_id], (err, result) => {
    if (err) {
      console.error('Error updating quantity in the database:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Status updated successfully');
    res.status(200).send('Status updated successfully');
  });
});

app.put('/api/update-quantity/:productId', (req, res) => {
  const productId = req.params.productId;
  const { quantity } = req.body;

  const query = 'UPDATE cart SET quantity = ? WHERE id = ?';

  db.query(query, [quantity, productId], (err, result) => {
    if (err) {
      console.error('Error updating quantity in the database:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Quantity updated successfully');
    res.status(200).send('Quantity updated successfully');
  });
});



app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM cart', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get(`/api/calculate-total/:username`, (req, res) => {
  const username = req.params.username;
  db.query('SELECT SUM(price * quantity) as total FROM cart WHERE username = ?', [username], (error, results) => {
    if (error) throw error;
    res.json(results[0].total);
  });
});

app.post('/api/add-product', (req, res) => {
  const { name, price, imageName, category } = req.body;

  // Insert the new item into the database
  const sql = 'INSERT INTO grocery (name, image, price, category) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, imageName, price, category], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.json({ success: false });
    } else {
      console.log('Item added to the database:', result);
      res.json({ success: true });
    }
  });
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM grocery WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.json({});
    } else {
      res.json(result[0] || {}); // Return the first result (or an empty object if not found)
    }
  });
});

app.put('/api/edit-product/:id', (req, res) => {
  const productId = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image
  const category = req.body.category

  const sql = 'UPDATE grocery SET name=?, image=?, price=?, category=? WHERE id=?';
  const values = [name, image, price, category, productId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.json({ success: false });
    } else {
      console.log('Product updated:', result);
      res.json({ success: true });
    }
  });
});

app.delete("/product-delete/:id", (req, res) => {
  const menuID = req.params.id;
  const q = "DELETE FROM grocery WHERE id=?"

  db.query(q, [menuID], (err, data)=>{
      if(err) return res.json(err)
      return res.json("data successfully deleted")
  })
})

app.listen(8800, ()=>{
    console.log("connected to backend hahaha")
})
