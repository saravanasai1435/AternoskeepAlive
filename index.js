const mineflayer = require('mineflayer');
const axios = require('axios');

const SERVER_HOST = 'saravanasai173.aternos.me';
const SERVER_PORT = 12934;
const USERNAME = 'MyBot';

// Fetch the dynamic IP from Aternos status API
async function getServerIP() {
  try {
    const res = await axios.get(`https://mcapi.us/server/status?ip=${SERVER_HOST}&port=${SERVER_PORT}`);
    if (res.data.online && res.data.host) {
      console.log('Server IP found:', res.data.host);
      return res.data.host;
    } else {
      throw new Error('Server offline or IP not ready');
    }
  } catch {
    console.log('Server not ready, retrying in 10s...');
    await new Promise(r => setTimeout(r, 10000));
    return getServerIP();
  }
}

async function startBot() {
  const ip = await getServerIP();

  const bot = mineflayer.createBot({
    host: ip,
    port: SERVER_PORT,
    username: USERNAME,
  });

  bot.once('spawn', () => console.log('Bot spawned!'));
  bot.on('chat', (u, msg) => { if (u !== bot.username) console.log(`<${u}> ${msg}`); });
  bot.on('end', () => { console.log('Disconnected, reconnecting...'); setTimeout(startBot, 10000); });
  bot.on('error', err => console.log('Error:', err.message));
}

startBot();
