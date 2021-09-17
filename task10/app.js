const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { CONFIG } = require('./configs');

mongoose.connect(CONFIG.DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    authRouter,
    usersRouter,
    carsRouter
} = require('./routers');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
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
