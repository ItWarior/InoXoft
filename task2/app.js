const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require(path.join(__dirname, 'allConfigs', 'config.js'));
const { getUsers, addUser } = require(path.join(__dirname, 'logic.js'))

const app = express();
const WAY_TO_STATIC = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(WAY_TO_STATIC));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', WAY_TO_STATIC);

app.get('/login', (req, res) => {
    res.render('sign-in')
})
app.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    const users = await getUsers();

    let valid = true;

    users.forEach(user => {
        if (user.email === email && user.password === password) {
            valid = false;
            res.render('user', { user: user, allUsers: users })
        }
    });

    if (valid) {
        res.redirect('/sign-up')
        return
    }
})

app.post('/seeAll', async (req, res) => {

    const users = await getUsers();
    res.render('users', { allUsers: users })

})

app.post('/register', async (req, res) => {
    const newUser = req.body;
    const users = await getUsers();

    const user = users.find(user => user.email === newUser.email);

    if (user) {
        res.status(400).end('There is the same user');
        return
    }

    users.push(newUser);
    await addUser(users);

    res.redirect('/login')
})


app.listen(PORT, () => {
    console.log(`listening...${PORT}`);
})
