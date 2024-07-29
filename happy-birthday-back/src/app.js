const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()

const hostname = '0.0.0.0';
const port = 3002;

const server = express();

// 1/ Dans le projet back installer sqlite
// 2/ Creer la table quotes avec id + quotes + author
// Connexcion BDD
let db = new sqlite3.Database('./db/hpbd.db', (err) => {
  if (err) {
      return console.error(err.message)
  }
  console.log('Database connected')
})

// >> CREATE TABLLE <<
let query = 'CREATE TABLE IF NOT EXISTS quotes (id PRIMARY KEY, quote CHAR(255) UNIQUE, author CHAR(255));'

db.run(query)

server.use(cors());

server.use(express.urlencoded());
server.use(express.json());

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
