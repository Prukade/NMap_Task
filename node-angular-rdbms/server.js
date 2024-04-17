const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'inventory'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
// Categories
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ id: result.insertId, name });
  });
});

// Products
app.get('/api/products', (req, res) => {
  const sql = 'SELECT p.id, p.name AS productName, c.name AS categoryName, p.categoryId FROM products p JOIN categories c ON p.categoryId = c.id';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.post('/api/products', (req, res) => {
  const { name, categoryId } = req.body;
  const sql = 'INSERT INTO products (name, categoryId) VALUES (?, ?)';
  db.query(sql, [name, categoryId], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ id: result.insertId, name, categoryId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

