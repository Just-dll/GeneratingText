const fs = require('fs');

fs.appendFile('./logs/logs.txt', `[${Date().toLocaleString()}] Bot started\n`, (err) => {
    if (err) throw err;
  });
console.log(`[${Date().toLocaleString()}] Bot started`);

function writeIntoLogs(text) {
    fs.appendFile('./logs/logs.txt', text, (err) => {
        if (err) throw err;
    });
    console.log(text);
}

async function LogError(error) {
    fs.appendFile('./logs/errors.txt', error, (err) => {
        if (err) console.log(err);
    })
    console.log(error);
}

async function logging(msg) {
    if (typeof msg !== 'undefined') {
        let message = `[${Date().toLocaleString()}]`+" Received message " + msg.text + " from chat " + msg.chat.id + '\n';
        writeIntoLogs(message);
    }
}


module.exports = {
    logging, LogError,
};