const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname)));
const db = new sqlite3.Database(path.join(__dirname, 'entreprise.db'), (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    }
});

const sqlScript = fs.readFileSync(path.join(__dirname, 'table.sql'), 'utf8');
db.exec(sqlScript, (err) => {
    if (err) {
        console.error('Error executing SQL script:', err.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
