const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { findMatches, connectWithMatch } = require('../controller/matchController');

router.get('/', auth, findMatches);
router.post('/connect', auth, connectWithMatch);

module.exports = router;