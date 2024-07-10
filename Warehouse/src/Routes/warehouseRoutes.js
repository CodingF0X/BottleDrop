const express = require('express');
const { createInventory, getAllBeverages, getWarehouse } = require('../Controllers/warehouseController');
const router = express.Router();

router.post('/', createInventory);
router.get('/', getWarehouse);
router.get('/getAllBeverages', getAllBeverages);


module.exports = router;