const fs = require('fs');
const path = require('path');
const avatarFilePath = path.join(__dirname, '..', 'model',  'avatars.json');
const avatarFolderPath = path.join(__dirname, '..', 'model');
const ensureFolderAndFilesExist = require('../helper/ensureFolderAndFilesExist');

const Avatar = require('../model/Avatar');

module.exports = { fs, avatarFilePath,  avatarFolderPath, Avatar, ensureFolderAndFilesExist };