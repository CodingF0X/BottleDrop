const express = require('express');
const { createInventory, getAllBeverages, getWarehouse, replenishBar } = require('../Controllers/warehouseController');
const router = express.Router();

router.post('/', createInventory);
router.get('/', getWarehouse);
router.get('/getAllBeverages', getAllBeverages);
router.post('/replenishBar', replenishBar);


module.exports = router;