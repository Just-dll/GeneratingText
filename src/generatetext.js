const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_TOKEN;

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

require("dotenv").config();

async function generateText(prompt)
{

const params = {
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.3,
  max_tokens: 150,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

const result = await openai.createCompletion(params)
  return result.data.choices[0].text;
}

module.exports = {
  connectToGeneration: async (prompt) => {
    const response = await generateText(prompt);
    return response;
  }
}