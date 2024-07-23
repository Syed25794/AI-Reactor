/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } = require("@google/generative-ai");
const { constants } = require('./../constant/constants');

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  },
  { 
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  }
];

const model = genAI.getGenerativeModel({
  model: constants.Gemini_Modal, safetySettings,
  systemInstruction: 'You are an expert in Chemistry.Give answer only what asked and how asked. Do not give extra information or extra things which is not asked in prompt.'
});

const generationConfig = {
  temperature: constants.temperature,
  topP: constants.topP,
  topK: constants.topK,
  maxOutputTokens: constants.maxOutputTokens,
  responseMimeType: constants.responseMimeTypeJSON,
};

const chatSession = model.startChat({
    generationConfig,
    history: [],
});

module.exports = chatSession;
