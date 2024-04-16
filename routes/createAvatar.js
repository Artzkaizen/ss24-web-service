const express = require('express');
const router = express.Router();
const { handleCreateAvatar } = require('../controllers/handleCreateAvatar');

router.post('/', handleCreateAvatar);

module.exports = router;