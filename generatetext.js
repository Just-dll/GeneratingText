const axios = require("axios");

require("dotenv").config();

const apiKey = process.env.OPENAI_TOKEN;

const client = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey,
  },
});

async function generateText(prompt)
{

const params = {
  prompt: prompt,
  model: "text-davinci-003",
  max_tokens: 250,
  temperature: 0.5,
};

const result = await client.post("https://api.openai.com/v1/completions", params)
  return result.data.choices[0].text;
}

module.exports = {
  connectToGeneration: async (prompt) => {
    const response = await generateText(prompt);
    return response;
  }
}