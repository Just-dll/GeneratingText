const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const myModule = require('./generatetext');
const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });
console.log("Bot just started")


bot.on('message', async msg => {
  const chatId = msg.chat.id;
  if (msg.text == '/start') {
    await bot.sendMessage(chatId, 'Hi, welcome');
    console.log('User ' + msg.chat.username + ' just started using bot');
  }
  else {
    var timeF = new Date().toLocaleString();
    console.log(`[${timeF}]`+" Received message " + msg.text + " from chat " + chatId);
    const result = await myModule.connectToGeneration(msg.text)
    bot.sendMessage(chatId, result);
    var time = new Date().toLocaleString();
    console.log(`[${time}]`+" The user " + msg.chat.username + " received response");
  }
});