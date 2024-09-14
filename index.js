const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('El bot está listo!');
});

client.on('message', message => {
    if(message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();