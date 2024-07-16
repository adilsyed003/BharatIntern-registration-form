const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;


const users = [
    {
        email: 'test@company.com',
        password: '1234',
    },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(401).send('Invalid email or password');
    }

    req.session.user = user;
    res.send('Login successful');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
