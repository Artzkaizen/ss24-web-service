const express = require('express');
const router = express.Router({mergeParams: true});
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Avatar = require('../model/avatar/Avatar');
const avatarSchema = require("../model/avatar/avatar.schema");
const ensureFolderAndFilesExist = require('../helper/ensureFolderAndFilesExist');
const createAvatar = require('../controllers/avatarControllers/createAvatarController');
const deleteAvatar = require('../controllers/avatarControllers/deleteAvatarController');
const updateAvatar = require('../controllers/avatarControllers/updateAvatarController');
const { getAllAvatars, getOneAvatar} = require('../controllers/avatarControllers/getAvatarsController');

// const handleLogin = require('../controllers/userControllers/authUserController');
const createUser = require('../controllers/userControllers/createUserController');
const handleLogin = require('../controllers/userControllers/authUserController');
const validator = require('express-joi-validation').createValidator({});

const { isChild, isParent} = require('../config/roles');

module.exports = {
    router,
    validator,
    passport,
    jwt,
    avatarSchema,
    Avatar,
    createAvatar,
    updateAvatar,
    deleteAvatar,
    getOneAvatar,
    getAllAvatars,
    createUser,
    handleLogin,
    isChild,
    isParent,
    ensureFolderAndFilesExist
 };