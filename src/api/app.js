require('dotenv/config');
const express = require('express');
const path = require('path');
const passport = require('passport');

const bodyParser = require('body-parser');
const { logger, jwtStrategy, passportStrategy} = require('./middleware/export')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(express.json());


passport.use(passportStrategy);
passport.use(jwtStrategy);

app.use(logger);

app.use('/auth', require('./routes/userRoutes'));
app.use('/api/avatars', require('./routes/avatarRoutes'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = { app, port };
