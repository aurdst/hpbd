module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");

    server
        .get("/getQuote", quoteController.getRandomQuote)
}