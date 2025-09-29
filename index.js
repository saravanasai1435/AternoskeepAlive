const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'saravanasai173.aternos.me', // Replace with your server's IP
  port: 12934,       // Default Minecraft port
  username: 'Botup', // Your Minecraft username
  password: 'your_password'    // Optional, if using a Mojang account
});

bot.on('spawn', () => {
  console.log('Bot has spawned!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  bot.chat(`Hello, ${username}! You said: ${message}`);
});
