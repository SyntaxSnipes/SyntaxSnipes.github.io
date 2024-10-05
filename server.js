const express = require('express');
const mysql = require('mysql2/promise'); // Use the promise version for async/await support
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3001'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Example API route to fetch books
app.get('/api/books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books');
        res.json(rows);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
