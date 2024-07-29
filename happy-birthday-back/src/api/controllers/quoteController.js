const parseService = require('../services/parseServiceQuote');
const CSV_QUOTES = 'quotes.csv';
const fs = require('fs');
const csv = require('csv-parser');

exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
  res.json({ ...TODAYS_QUOTE });
};

exports.insertQuoteInDb = async (req, res, db) => {
  // Recuperer les quotes
  try {
    fs.createReadStream(`./data/${CSV_QUOTES}`)
      .pipe(csv())
      .on('data', (row) => {
        const { quote, author } = row;
        db.run('INSERT OR IGNORE INTO quotes (quotes, author) VALUES (?, ?)', [quote, author], (err) => {
          if (err) {
            return console.error('Error inserting', err.message);
          }
        })
        .on('end', () => {
            console.log('CSV successfully imported');
            res.json({ message: 'Quotes successfully inserted into the database' });
        })
        .on('error', (error) => {
            console.error('Error reading CSV file', error.message);
            res.status(500).json({ error: error.message });
        });
      })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}