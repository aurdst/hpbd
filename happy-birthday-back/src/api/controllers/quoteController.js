const parseService = require('../services/parseServiceQuote');
const CSV_QUOTES = 'quotes.csv';
exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
  res.json({ ...TODAYS_QUOTE });
};
