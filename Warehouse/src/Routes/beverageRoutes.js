const express =  require('express');
const { createBeverage, updateBeverage, deleteBeverage } = require('../Controllers/beverageController');
const validateObjectId = require('../Middleware/validateObjectId');
const { getSingleBeverage } = require('../Controllers/warehouseController');
const router = express.Router();

router.post('/', createBeverage)
router.get('/:id', validateObjectId, getSingleBeverage)
router.put('/:id',validateObjectId, updateBeverage)
router.delete('/:id',validateObjectId, deleteBeverage)

module.exports = router;