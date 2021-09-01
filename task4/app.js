const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT } = require(path.join(__dirname, 'configs', 'config.js'));

mongoose.connect('mongodb://localhost:27017/inoxoft');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { usersRouter, authRouter, carsRouter } = require('./routers');

app.use('/users', usersRouter);
// app.use('/auth', authRouter);
app.use('/cars', carsRouter);
app.use(_mainErrorHandler);


app.listen(PORT, () => {
    console.log(`listening...${PORT}`);
})

function _mainErrorHandler(err, req, res, next) {

    res.status(err.status || 500)
        .json({ message: err.message } || 'Unknown error');

}