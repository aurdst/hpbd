module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");

    server
        .get("/getQuote", quoteController.getRandomQuote)

    server
        .post('/insert', (req, res) => quoteController.insertQuoteInDb(req, res, db));
}