const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const fs = require('fs'); 


const app = express();
const PORT = 3001;

const corsOptions = {
    origin: ['https://www.bookback.me', 'https://bookback-517b2g7qt-mohammed-aayan-pathans-projects.vercel.app'], // Allow both your main site and Vercel
    methods: 'GET,POST', 
    credentials: true
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        ca: fs.readFileSync(process.env.SSL_CA) 
    }
});

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});




app.get('/books', (req, res) => {
    connection.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Database query error:', err);  // Log the error
            return res.status(500).json({ error: 'Database query failed' });
        }
        console.log(results); // Log the results
        res.json(results);
    });
});


app.post('/books', (req, res) => {
    const { isbn, unique_code, price, grade } = req.body;
    const id = `${isbn}-${unique_code}`;
    const received_date = new Date();

    db.query(
        'INSERT INTO books (id, name, received_date, price, grade) VALUES (?, ?, ?, ?, ?)',
        [id, received_date, price, grade],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Book added successfully' });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
