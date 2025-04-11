// // server/convertCode.js
// const axios = require('axios');
// const dotenv = require('dotenv');
// dotenv.config();

// const HF_API_TOKEN = process.env.HF_TOKEN;
// const HF_MODEL_ENDPOINT = 'https://api-inference.huggingface.co/models/bigcode/santacoder';

// async function convertCodeWithLLM(inputCode, sourceLang, targetLang) {
//   const prompt = `Convert the following ${sourceLang} code to ${targetLang}:\n\n${inputCode}\n\nConverted code:\n`;

//   try {
//     const response = await axios.post(
//       HF_MODEL_ENDPOINT,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_API_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const generatedText = response.data.generated_text || response.data[0]?.generated_text;

//     if (!generatedText) throw new Error('No output from Hugging Face API');

//     return generatedText.trim();
//   } catch (err) {
//     console.error('HF conversion error:', err.message);
//     throw err;
//   }
// }

// module.exports = convertCodeWithLLM;


// -------------------------------------------------------------
const axios = require('axios');

//  * Converts code from sourceLang to targetLang using the local Flask server (Python).
//  * @param {string} inputCode - The source code to be converted.
//  * @param {string} sourceLang - The source language (e.g., "C++").
//  * @param {string} targetLang - The target language (e.g., "Java").
//  * @returns {Promise<string>} - The converted code from the Python model.

async function convertCodeWithLLM(inputCode, sourceLang, targetLang) {
  const prompt = `Convert the following ${sourceLang} code to ${targetLang}:\n\n${inputCode}\n\nConverted code:\n`;

  try {
    const response = await axios.post(
      'http://localhost:5001/convert', // Flask backend endpoint
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data || !response.data.output) {
      throw new Error('No output received from Python model');
    }

    return response.data.output.trim();
  } catch (err) {
    console.error('Python API conversion error:', err.message);
    throw err;
  }
}

module.exports = convertCodeWithLLM;
