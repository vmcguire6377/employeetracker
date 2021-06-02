const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3001;
const app = express();
//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //username
        user: 'root',
        //sql password
        password: 'Drm71vmm77!',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
    );
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.query(`SELECT * FROM employees`, (err, rows) => {
    console.log(rows)
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});