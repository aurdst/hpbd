const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");
const fs = require('fs');
const csv = require('csv-parser');

const CSV_STUDENTS = "students.csv";
const CSV_TEACHERS = "intervenants.csv";

exports.getTodaysBirthday = async (req, res) => {
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL'); //=> '2014 août 06'

    const STUDENTS_BIRTHDAY = await parseService.parseFile(CSV_STUDENTS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    const TEACHERS_BIRTHDAY = await parseService.parseFile(CSV_TEACHERS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    res.json({
        count_total: STUDENTS_BIRTHDAY.length + TEACHERS_BIRTHDAY.length,
        students_birthday : STUDENTS_BIRTHDAY,
        teachers_birthday : TEACHERS_BIRTHDAY
    })
}

exports.insertInDB = async(req, res, db) => {
    // Recuperer le CSV
    fs.createReadStream(`./data/${CSV_STUDENTS}`)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      const { birthday, lastname, firstname, email } = row;
      db.run('INSERT OR IGNORE INTO brithday (brithday, lastname, fristname, email) VALUES (?, ?, ?, ?)', [birthday, lastname, firstname, email], (err) => {
        if (err) {
          console.error('Error inserting', err.message);
        } else {
            console.log(`Inserted: ${birthday} by ${firstname}`); // Log pour vérifier l'insertion
        }
      });
    })
    .on('end', () => {
      console.log('CSV successfully imported');
      res.json({ message: 'Dates successfully inserted into the database' });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

exports.getBrithdayFromDb = (req, res, db) => {
    db.all('SELECT * FROM brithday', [], (err, rows) => {
      if (err) {
          console.log('err', err.message);
          return res.status(500).json({ message: 'Erreur de chargement' });
      }
      res.json(rows);
    });
  }