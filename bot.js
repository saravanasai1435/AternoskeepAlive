const mineflayer = require('mineflayer');

// Server configuration
const SERVER_HOST = 'saravanasai173.aternos.me';
const SERVER_PORT = 12934;
const BOT_USERNAME = 'UpTimeBot';

// Configuration
const RECONNECT_DELAY = 10000; // 10 seconds (increased to reduce server load)
const MAX_RECONNECT_ATTEMPTS = -1; // Infinite attempts

let reconnectAttempts = 0;
let bot = null;
let isReconnecting = false; // Guard to prevent multiple concurrent reconnections

function createBot() {
    console.log(`[${new Date().toISOString()}] Creating bot...`);
    
    // Reset the reconnecting flag since we're starting a new connection attempt
    isReconnecting = false;
    
    // Clean up any existing bot instance
    if (bot) {
        try {
            bot.removeAllListeners();
            bot.quit();
        } catch (err) {
            // Ignore cleanup errors
        }
        bot = null;
    }
    
    bot = mineflayer.createBot({
        host: SERVER_HOST,
        port: SERVER_PORT,
        username: BOT_USERNAME,
        version: false, // Auto-detect version
        auth: 'offline'
    });

    bot.on('login', () => {
        console.log(`[${new Date().toISOString()}] ✅ Successfully connected to ${SERVER_HOST}:${SERVER_PORT}`);
        console.log(`[${new Date().toISOString()}] Bot username: ${bot.username}`);
        reconnectAttempts = 0;
    });

    bot.on('spawn', () => {
        console.log(`[${new Date().toISOString()}] Bot spawned in the world`);
    });

    bot.on('health', () => {
        console.log(`[${new Date().toISOString()}] Health: ${bot.health}, Food: ${bot.food}`);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`[${new Date().toISOString()}] <${username}> ${message}`);
    });

    bot.on('error', (err) => {
        console.error(`[${new Date().toISOString()}] ❌ Bot error:`, err.message);
        reconnect();
    });

    bot.on('end', (reason) => {
        console.log(`[${new Date().toISOString()}] ❌ Bot disconnected. Reason:`, reason);
        reconnect();
    });

    bot.on('kicked', (reason) => {
        console.log(`[${new Date().toISOString()}] ❌ Bot was kicked. Reason:`, reason);
        reconnect();
    });
}

function reconnect() {
    // Prevent multiple concurrent reconnection attempts
    if (isReconnecting) {
        return;
    }
    
    if (MAX_RECONNECT_ATTEMPTS !== -1 && reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log(`[${new Date().toISOString()}] Maximum reconnection attempts reached. Stopping.`);
        process.exit(1);
    }

    isReconnecting = true;
    reconnectAttempts++;
    console.log(`[${new Date().toISOString()}] 🔄 Reconnecting in ${RECONNECT_DELAY/1000} seconds... (Attempt ${reconnectAttempts})`);
    
    setTimeout(() => {
        createBot();
    }, RECONNECT_DELAY);
}

// Handle process termination gracefully
process.on('SIGINT', () => {
    console.log(`[${new Date().toISOString()}] Received SIGINT. Disconnecting bot...`);
    if (bot) {
        bot.quit('Bot shutting down');
    }
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log(`[${new Date().toISOString()}] Received SIGTERM. Disconnecting bot...`);
    if (bot) {
        bot.quit('Bot shutting down');
    }
    process.exit(0);
});

// Start the bot
console.log(`[${new Date().toISOString()}] Starting Minecraft Keep-Alive Bot`);
console.log(`[${new Date().toISOString()}] Target Server: ${SERVER_HOST}:${SERVER_PORT}`);
createBot();