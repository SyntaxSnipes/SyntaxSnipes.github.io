const express = require('express');
const mysql = require('mysql2/promise'); // Use the promise version for async/await support
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3001', // Update with your local URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


const caCert = fs.readFileSync(path.join(__dirname, process.env.CA_CERT_PATH || 'ca.pem'));



app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.SSL_CA),
    },
});

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT 1');
        res.json({ message: 'Database is connected', results });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection error' });
    }
});

// API endpoint to get books
app.get('/api/books', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM books');
        res.json(results);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
