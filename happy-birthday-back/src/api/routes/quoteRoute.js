module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");
    const db = require('../../db/db');

    server
        .get("/getQuote", quoteController.getRandomQuote)

    server
        .post('/insert', (req, res) => quoteController.insertQuoteInDb(req, res, db));
    server
        .get("/getFromDB", (req, res) => quoteController.getQuotesFromDb(req, res, db))
}