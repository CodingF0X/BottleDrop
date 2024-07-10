const express = require('express');
const { createBar, getBarDetails, getAllBars } = require('../Controllers/barController');
const validateObjectId = require('../Middleware/validateObjectId');
const router = express.Router();

router.post('/', createBar)
router.get('/getAllBars', getAllBars)
router.get('/:id',validateObjectId, getBarDetails)

module.exports = router;