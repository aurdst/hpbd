const fs = require("fs");
const { parse } = require("csv-parse");
const { DateTime } = require("luxon");

exports.parseFile = (filename) => {
    let results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(`./data/${filename}`)
            .pipe(parse({
                delimiter: ";",
                columns: true,
                bom: true,
            }))
            .on("data", function (row) {
                results.push(row)
            })
            .on("end", function () {
                // Utilisez Luxon pour obtenir la date actuelle
                const today = DateTime.now();
                // Convertissez cette date en un nombre (ex: YYYYMMDD) pour assurer l'unicité par jour
                const dateNumber = parseInt(today.toFormat('yyyyMMdd'));
                // Utilisez le nombre obtenu pour sélectionner une citation de manière cyclique
                const quoteIndex = dateNumber % results.length;
                resolve(results[quoteIndex])
            })
            .on("error", function (error) {
                reject(error.message);
            });
    })
}
