const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});

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
    console.log(query);
   if (query.data === 'leave_request') {
       bot.sendMessage(572303826, `Пользователь ${query.from.first_name} начал оставлять заявку`);
       bot.sendMessage(query.message.chat.id,
           "Пожалуйста, оставьте следущие данные:\n—Модель, цвет и память устройства,\n—описание(ремонты, недостатки, состояние аккумулятора)\n—фото\n— номер для связи"
       )
       bot.on('message', msg => {
           bot.sendMessage(572303826, `Пользователь @${msg.from.username} оставил заявку: ${msg.text}`);
           console.log(msg)
           bot.sendMessage(msg.chat.id, 'Спасибо, мы свяжемся с вами!')
       });
   }
    if (query.data === 'go_fuck_yourself') {
        bot.sendMessage(572303826, `Пользователь ${query.from.first_name} сходил нахуй`);
    }
});

bot.on('message', msg => {
    console.log(msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}! Что хочешь сделать?`, {
        reply_markup: {
            inline_keyboard: startKeyboard
        }
    });
});

//Руслан 818230750