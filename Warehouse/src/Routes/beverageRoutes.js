const express =  require('express');
const { createBeverage, updateBeverage } = require('../Controllers/beverageController');
const router = express.Router();

router.post('/', createBeverage)
router.put('/:id', updateBeverage)

module.exports = router;