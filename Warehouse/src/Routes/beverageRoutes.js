const express =  require('express');
const { createBeverage, updateBeverage, deleteBeverage } = require('../Controllers/beverageController');
const validateObjectId = require('../Middleware/validateObjectId');
const router = express.Router();

router.post('/', createBeverage)
router.put('/:id',validateObjectId, updateBeverage)
router.delete('/:id',validateObjectId, deleteBeverage)

module.exports = router;