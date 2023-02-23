const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const myModule = require('./src/generatetext');
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });
console.log("Bot just started")

let commands = require('./commands.json');

bot.setMyCommands(JSON.stringify(commands));

bot.onText('start', async msg => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Hi, welcome');
    console.log('User ' + msg.chat.username + ' just started using bot');
});
bot.onText(/\/prompt (.+)/ , async function(msg, match) {
  const chatId = msg.chat.id;
  var timeF = new Date().toLocaleString();
  console.log(`[${timeF}]`+" Received message " + msg.text + " from chat " + chatId);
  const text = match[1];
  const result = await myModule.connectToGeneration(text)
  bot.sendMessage(chatId, result);
  var time = new Date().toLocaleString();
  console.log(`[${time}]`+" The user " + msg.chat.username + " received response");
});