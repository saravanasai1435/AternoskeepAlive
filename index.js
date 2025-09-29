const mineflayer = require('mineflayer');
const axios = require('axios');

const SERVER_HOST = 'saravanasai173.aternos.me'; // just the host, no port here
const SERVER_PORT = 12934;                        // port separate
const USERNAME = 'MyBot';

// Wait until server responds
async function waitForServer() {
  console.log('Checking if server is online...');
  let online = false;

  while (!online) {
    try {
      await axios.get(`https://mcapi.us/server/status?ip=${SERVER_HOST}&port=${SERVER_PORT}`);
      online = true;
      console.log('Server is online! Connecting bot...');
    } catch (err) {
      console.log('Server not ready yet, retrying in 10s...');
      await new Promise(res => setTimeout(res, 10000));
    }
  }
}

// Create the Mineflayer bot
function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
  });

  bot.once('spawn', () => {
    console.log('Bot has spawned in the server!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`<${username}> ${message}`);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });

  return bot;
}

// Start the process
(async () => {
  await waitForServer();
  createBot();
})();
