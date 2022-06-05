const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Run application on port ' + port);
});

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
    console.log('Token should be provided');
}
const bot = new TelegramBot(token, {polling: true});

const ownerId = 818230750;

const startKeyboard = [
    [{
        text: 'Предложить телефон на выкуп',
        callback_data: 'leave_request'
    }],
    [{
        text: 'Сходить нахуй',
        callback_data: 'go_fuck_yourself'
    }]];

bot.on('callback_query', query => {
   if (query.data === 'leave_request') {
       bot.sendMessage(ownerId, `Пользователь ${query.from.first_name} начал оставлять заявку`);
       bot.sendMessage(query.message.chat.id,
           "Пожалуйста, оставьте следущие данные:\n—Модель, цвет и память устройства,\n—описание(ремонты, недостатки, состояние аккумулятора)\n—фото\n— номер для связи"
       )
       bot.on('message', msg => {
           bot.sendMessage(ownerId, `Пользователь ${msg.from.first_name} оставил заявку: ${msg.text}`);
           bot.sendMessage(msg.chat.id, 'Спасибо, мы свяжемся с вами!');
       });
   }
    if (query.data === 'go_fuck_yourself') {
        bot.sendMessage(ownerId, `Пользователь ${query.from.first_name} сходил нахуй`);
    }
});

bot.on('message', msg => {
    const chatId = msg.chat.id;
    if (msg.text === '/start') {
        bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}! Что хочешь сделать?`, {
            reply_markup: {
                inline_keyboard: startKeyboard
            }
        });
    }
});
