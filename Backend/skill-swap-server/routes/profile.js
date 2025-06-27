const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { updateSkills, getProfile } = require('../controller/profileController');

router.get('/', auth, getProfile);
router.put('/skills', auth, updateSkills);

module.exports = router;