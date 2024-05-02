const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const { BasicStrategy } = require('passport-http');
const {Strategy : JwtStrategy, ExtractJwt} = require('passport-jwt')
const bcrypt = require('bcrypt')
const userFilePath = path.join(__dirname, '..', 'model', 'user', 'users.json');

module.exports = {
    format,
    uuid,
    fs,
    path,
    bcrypt,
    BasicStrategy,
    JwtStrategy,
    ExtractJwt,
    userFilePath,
}