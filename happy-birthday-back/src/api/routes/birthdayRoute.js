module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayController");
    const db = require('../../db/db');

    server
        .get("/getBirthday", birthdayController.getTodaysBirthday)
        // .get("/sendBirthdayEmail", birthdayController.sendBirthdayEmail);

    server
        .post("/insertBrithdayDb", (req, res) => birthdayController.insertInDB(req, res, db))

    server
        .get("/getDateFromDB", (req, res) => birthdayController.getBrithdayFromDb(req, res, db))
}