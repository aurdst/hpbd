const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/hpbd.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connected');
});

// Création de la table quotes si elle n'existe pas déjà
let query = 'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT UNIQUE, author TEXT);';
db.run(query, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table created or already exists');
});

// Création de la table brithday si elle n'existe pas déjà
let queryBrith = 'CREATE TABLE IF NOT EXISTS brithday (id INTEGER PRIMARY KEY AUTOINCREMENT, brithday DATETIME, lastname TEXT, fristname TEXT, email TEXT);';
db.run(queryBrith, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Table Brithday created or already exists');
});

module.exports = db;
