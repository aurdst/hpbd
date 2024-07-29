module.exports = (server) => {
    const birthdayController = require("../controllers/birthdayController");

    server
        .get("/getBirthday", birthdayController.getTodaysBirthday)
        // .get("/sendBirthdayEmail", birthdayController.sendBirthdayEmail);

    // server
    //     .post("/insertCsvInDb", birthdayController.)
}