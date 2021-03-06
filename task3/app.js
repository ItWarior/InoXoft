const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require(path.join(__dirname, 'configs', 'config.js'));

const app = express();
const WAY_TO_STATIC = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(WAY_TO_STATIC));

const { usersRouter, authRouter } = require('./routers');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use(_mainErrorHandler);


app.listen(PORT, () => {
    console.log(`listening...${PORT}`);
})

function _mainErrorHandler(err, req, res, next) {

    res.status(err.status || 500)
        .json({ message: err.message || 'Unknown error' })

}