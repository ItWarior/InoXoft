/* eslint-disable max-len */
// Вам потрібно зробив флов аутентифікації

// Всі ендпоінти, які на вашу думку потребують від юзера бути авторизованим мають бути закриті токенами.
// Рефреш токен реалізувати самим (якщо вас не було в кінці) і оптимізувати мій алгоритм або написати свій.
// Якщо ви робите видалення\оновлення юзера, то це робити має тільки той юзер якого ви видаляєте. Не можу юзер 10 видалити юзера 25. Тільки юзер 10 видаляє юзера 10.
// При створенні другої сутності (машинка, книжка, хатка)  має робитись привязка до юзера хто її створив
// При видаленні\оновленні вашої другої сутності (машинка, книжка, хатка) так само реалзівувати перевірку, що робити це має право лише юзер який її робив

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { CONFIG } = require('./configs');

mongoose.connect(CONFIG.DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, usersRouter, carsRouter } = require('./routers');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/cars', carsRouter);
app.use(_mainErrorHandler);

app.listen(CONFIG.PORT, () => {
    console.log(`listening...${CONFIG.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || 500)
        .json({ message: err.message } || 'Unknown error');
}
