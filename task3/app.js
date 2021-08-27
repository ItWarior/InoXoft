const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require(path.join(__dirname, 'configs', 'config.js'));

const app = express();
const WAY_TO_STATIC = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(WAY_TO_STATIC));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', WAY_TO_STATIC);

const mainRouter = require('./routers');

app.use('/users', mainRouter.usersRouter);
app.use('/auth', mainRouter.authRouter);

app.listen(PORT, () => {
    console.log(`listening...${PORT}`);
})
