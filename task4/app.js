// Вам необхідно реалізувати CRUD на дві сутності 
// User
// І друга на ваш смак. (Car, House, .... ваш варіант)

// Мають бути реалізовані такі методи:
// 1) Create user
// 2) Get all users
// 3) Get user by id
// 4) Delete current user
// 5) Update user

// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
// Також всі меджік стрінги мають бути винесені в константи.

// додати errorHandler

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT } = require(path.join(__dirname, 'configs', 'config.js'));

mongoose.connect('mongodb://localhost:27017/inoxoft');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { usersRouter, authRouter } = require('./routers');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use(_mainErrorHandler);


app.listen(PORT, () => {
    console.log(`listening...${PORT}`);
})

function _mainErrorHandler(err, req, res, next) {

    res.status(err.status || 500)
        .json({ message: err.message } || 'Unknown error');

    // console.log(err.pretty());
}