const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const Generate = require('./src/generatetext');
const token = process.env.TELEGRAM_TOKEN;
const log = require('./logs/logging')
let commands = require('./commands.json');

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(JSON.stringify(commands));

bot.onText(/\/start/, async msg => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Hi, welcome');
  log.logging(msg);
});

bot.onText(/\/prompt (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  log.logging(msg);
  const text = match[1];
  const result = await Generate.connectToGeneration(text)
  bot.sendMessage(chatId, result);
})
