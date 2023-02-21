const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const myModule = require('./generatetext');
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
console.log("Bot just started")

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async msg => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
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