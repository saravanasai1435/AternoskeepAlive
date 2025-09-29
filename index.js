// index.js
const mineflayer = require('mineflayer');

// === CONFIG ===
const HOST = 'saravanasai173.aternos.me'; // replace with your Aternos IP
const PORT = 12934;                  // replace with your Aternos port
const USERNAME = 'MyBot';            // bot username

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
  });

  // Log when bot spawns
  bot.once('spawn', () => {
    console.log(`Bot has spawned in the server!`);
  });

  // Log chat messages
  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // ignore bot's own messages
    console.log(`<${username}> ${message}`);
  });

  // Auto reconnect if disconnected
  bot.on('end', () => {
    console.log('Disconnected from server. Reconnecting in 10s...');
    setTimeout(createBot, 10000); // restart bot after 10 seconds
  });

  // Error handling
  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });

  return bot;
}

// Start the bot
createBot();
