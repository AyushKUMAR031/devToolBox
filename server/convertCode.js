// server/convertCode.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function convertCodeWithLLM(inputCode, sourceLang, targetLang) {
  const prompt = `### Task: Convert the following ${sourceLang} code to ${targetLang}.

### Source Code (${sourceLang}):
${inputCode}

### Output (${targetLang}):`;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    if (!output) throw new Error("No output received from Gemini");

    // ✅ Remove ```language and ``` from beginning and end of the output
    const cleanedOutput = output.replace(/```[a-zA-Z]*\n?/, '').replace(/```/g, '').trim();

    return cleanedOutput;

  } catch (err) {
    console.error("Gemini API error:", err.message);
    throw err;
  }
}

module.exports = convertCodeWithLLM;