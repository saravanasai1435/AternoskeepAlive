const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'saravanasai173.aternos.me', // your Aternos IP
    port: 12934,                        // your server port
    username: 'BotAccount123',          // use a separate account
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in!');
  });

  bot.on('spawn', () => {
    console.log('🌎 Bot spawned in the world!');
  });

  bot.on('end', (reason) => {
    console.log('❌ Bot disconnected:', reason);
    console.log('⏳ Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000); // reconnect after 5s
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ Bot was kicked:', reason);
    console.log('⏳ Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000); // reconnect after 5s
  });

  bot.on('error', (err) => {
    console.log('💥 Bot error:', err);
  });

  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
  });
}

createBot();
