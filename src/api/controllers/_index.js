const fs = require('fs');
const path = require('path');
const avatarFilePath = path.join(__dirname, '..', 'model', 'avatar', 'avatars.json');
const avatarFolderPath = path.join(__dirname, '..', 'model', 'avatar');
const userFilePath = path.join(__dirname, '..', 'model', 'user', 'users.json');
const userFolderPath = path.join(__dirname, '..', 'model', 'user',);
const ensureFolderAndFilesExist = require('../helper/ensureFolderAndFilesExist');

const Avatar = require('../model/avatar/Avatar');
const User = require('../model/user/User');

module.exports = {
    fs,
    avatarFilePath,
    avatarFolderPath,
    userFilePath,
    userFolderPath,
    Avatar,
    User,
    ensureFolderAndFilesExist
};