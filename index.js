const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'play.example.com', // server IP
  port: 25565,              // server port
  username: 'YourBotName'
});

bot.on('spawn', () => {
  console.log('Bot has spawned in the server!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  console.log(`${username}: ${message}`);
});
