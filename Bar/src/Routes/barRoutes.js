const express = require('express');
const { createBar } = require('../Controllers/barController');
const router = express.Router();

router.post('/', createBar)


module.exports = router;