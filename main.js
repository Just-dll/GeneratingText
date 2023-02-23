const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const Generate = require('./src/generatetext');
const token = process.env.TELEGRAM_TOKEN;
const log = require('./logs/logging')
const commands = require('./commands.json');

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(JSON.stringify(commands));

const handlers = Object.fromEntries(
  commands.map(({ handler }) => [handler, eval(handler)])
);

async function onStart(msg) {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Hi, welcome');
  log.logging(msg);
}

// Define the onPrompt handler function
async function onPrompt(msg) {
  const chatId = msg.chat.id;
  log.logging(msg);
  const text = msg.text.substr(msg.text.indexOf(" ") + 1);;
  const result = await Generate.connectToGeneration(text)
  bot.sendMessage(chatId, result);
}

// Loop through the commands array and set up the command handlers
commands.forEach(command => {
  bot.onText(new RegExp(`^\\/${command.command}\\b`), async msg => {
    // Call the appropriate handler function for the command
    await handlers[command.handler](msg);
  });
});