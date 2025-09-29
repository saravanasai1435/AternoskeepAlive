const axios = require('axios');
const schedule = require('node-schedule');

// Replace with your Aternos server URL (Play link)
const SERVER_URL = 'https://aternos.org/go/saravanasai173.aternos.me/';


async function pingServer() {
    try {
        await axios.get(SERVER_URL);
        console.log(`[${new Date().toLocaleString()}] Server pinged successfully!`);
    } catch (error) {
        console.log(`[${new Date().toLocaleString()}] Ping failed:`, error.message);
    }
}

// Ping every 5 minutes
schedule.scheduleJob('*/5 * * * *', pingServer);

console.log('Aternos keep-alive script running...');
