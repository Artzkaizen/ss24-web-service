require('dotenv/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const logger = require('./middleware/logReqs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use(logger)
app.use('/api/avatars', require('./routes/createAvatar'));
app.use('/api/avatars/:id', require('./routes/deleteAvatar'));
app.use('/api/avatars/:id', require('./routes/updateAvatar'));
app.use('/api/avatars', require('./routes/getAvatars'));
app.use('/api/avatars/:id', require('./routes/getAvatars'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = { app, port };
