const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'saravanasai173.aternos.me', // your server
    port: 12934,                       // your port
    username: 'BotAccount123',         // your bot account
    connectTimeout: 10000              // 10s timeout
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in successfully!');
  });

  bot.on('spawn', () => {
    console.log('🎮 Bot spawned in the world!');
  });

  bot.on('error', (err) => {
    console.log('💥 Bot error:', err);
  });

  bot.on('end', (reason) => {
    console.log('❌ Bot disconnected:', reason);
    console.log('⏳ Reconnecting in 20 seconds...');
    setTimeout(createBot, 20000);
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ Bot was kicked:', reason);
    console.log('⏳ Reconnecting in 20 seconds...');
    setTimeout(createBot, 20000);
  });

  // Anti-idle ping
  setInterval(() => {
    if (bot.player) bot.chat('/ping'); // tiny chat to prevent idle disconnect
  }, 60000); // every 60 seconds
}

// Start bot
createBot();
