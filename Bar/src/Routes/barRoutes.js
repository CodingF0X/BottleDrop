const express = require('express');
const { createBar, getBarDetails, getAllBars, updateStock } = require('../Controllers/barController');
const validateObjectId = require('../Middleware/validateObjectId');
const router = express.Router();

router.post('/', createBar)
router.get('/getAllBars', getAllBars)
router.get('/:id',validateObjectId, getBarDetails)
router.patch('/:id',validateObjectId, updateStock)

module.exports = router;