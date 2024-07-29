const parseService = require('../services/parseServiceQuote');
const CSV_QUOTES = 'quotes.csv';
const fs = require('fs');
const csv = require('csv-parser');

exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
  res.json({ ...TODAYS_QUOTE });
};

exports.insertQuoteInDb = async (req, res, db) => {
  // Récupérer les quotes
  fs.createReadStream(`./data/${CSV_QUOTES}`)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      const { quote, author } = row;
      console.log('Row:', row); // Ajout de logs pour diagnostiquer le contenu
      db.run('INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)', [quote, author], (err) => {
        if (err) {
          console.error('Error inserting', err.message);
        } else {
            console.log(`Inserted quote: ${quote} by ${author}`); // Log pour vérifier l'insertion
        }
      });
    })
    .on('end', () => {
      console.log('CSV successfully imported');
      res.json({ message: 'Quotes successfully inserted into the database' });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getQuotesFromDb = (req, res, db) => {
  db.all('SELECT * FROM quotes', [], (err, rows) => {
    if (err) {
        console.log('err', err.message);
        return res.status(500).json({ message: 'Erreur de chargement' });
    }
    res.json(rows);
  });
}