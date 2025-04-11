// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const convertCodeWithLLM = require('./convertCode');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/convert', async (req, res) => {
  const { inputCode, sourceLang, targetLang } = req.body;

  try {
    const convertedCode = await convertCodeWithLLM(inputCode, sourceLang, targetLang);
    res.json({ convertedCode });
  } catch (error) {
    res.status(500).json({ error: 'Code conversion failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
