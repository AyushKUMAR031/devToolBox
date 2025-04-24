// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const convertCodeWithLLM = require('./convertCode');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
  const { inputCode, sourceLang, targetLang } = req.body || {};

  if (!inputCode || !sourceLang || !targetLang) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
// hi push12

  try {
    const convertedCode = await convertCodeWithLLM(inputCode, sourceLang, targetLang);
    res.json({ convertedCode });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Conversion failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
