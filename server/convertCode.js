// server/convertCode.js
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function convertCodeWithLLM(inputCode, sourceLang, targetLang) {
  const prompt = `Convert the following ${sourceLang} code into ${targetLang}:\n\n${inputCode}\n\nConverted ${targetLang} code:\n`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that converts code between programming languages.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error('LLM conversion failed:', err.message);
    throw err;
  }
}

module.exports = convertCodeWithLLM;
