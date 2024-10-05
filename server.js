const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',  // Add the origin where you want to allow requests from
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Application/json'],
    credentials: true,  // Allow credentials (cookies, etc.) if needed
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));

// Database connection
const connection = mysql.createConnection({
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

console.log('Connecting to database:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test database connection
app.get('/test-db', (req, res) => {
    connection.query('SELECT 1', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database connection error' });
        }
        res.json({ message: 'Database is connected', results });
    });
});

// Fetch books
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books';

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching books' });
        }
        res.json(results);
    });
});

// Log request information for debugging
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    next();
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('Using SSL CA file:', process.env.SSL_CA);
