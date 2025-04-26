// bot.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

client.on('message', async (message) => {
    if (!message.body) return;

    try {
        const response = await axios.post('https://your-backend-url/chat', {
            message: message.body
        });

        if (response.data && response.data.reply) {
            message.reply(response.data.reply);
        } else {
            message.reply("Sorry, I couldn't understand that.");
        }
    } catch (error) {
        console.error('Error communicating with backend:', error);
        message.reply("Backend error.");
    }
});

client.initialize();
