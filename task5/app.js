// Вам необхідно провалідувати всі можливі вхідні обєкти (body, query обовязково, params оптціонально)
// Що б нічого не валідного навіть не доходило до платформи. 
// Також для юзерів необхідно зробити хешування паролів.
// Зверніть увагу на те, що повертати пароль на респонсі категорично заборонено. Він має жити тільки в межах бекенду. Ніхто ззовні не має знати про його існування. 
// Для цього робить або select:fasle або нормалізатор. 


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { CONFIG } = require(path.join(__dirname, 'configs'));

mongoose.connect('mongodb://localhost:27017/inoxoft');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { usersRouter, authRouter, carsRouter } = require('./routers');

app.use('/users', usersRouter);
// app.use('/auth', authRouter);
app.use('/cars', carsRouter);
app.use(_mainErrorHandler);


app.listen(CONFIG.PORT, () => {
    console.log(`listening...${CONFIG.PORT}`);
})

function _mainErrorHandler(err, req, res, next) {

    res.status(err.status || 500)
        .json({ message: err.message } || 'Unknown error');

}