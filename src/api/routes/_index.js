const express = require('express');
const router = express.Router({mergeParams: true});
const Avatar = require('../model/Avatar');
const avatarSchema = require("../model/avatar.schema");
const ensureFolderAndFilesExist = require('../helper/ensureFolderAndFilesExist');
const createAvatar = require('../controllers/createAvatarController');
const deleteAvatar = require('../controllers/deleteAvatarController');
const updateAvatar = require('../controllers/updateAvatarController');
const { getAllAvatars, getOneAvatar} = require('../controllers/getAvatarsController');

const validator = require('express-joi-validation').createValidator({});

module.exports = { 
    router, 
    validator, 
    avatarSchema, 
    Avatar,
    createAvatar, 
    updateAvatar,
    deleteAvatar,
    getOneAvatar, 
    getAllAvatars, 
    ensureFolderAndFilesExist
 };