const express = require('express');
const router = express.Router();
const { getMessages, saveMessage } = require('../controller/messageController');

router.get('/:roomId', getMessages);
router.post('/', saveMessage);

module.exports = router;