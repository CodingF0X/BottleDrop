const express = require('express');
const { createInventory, getAllBeverages, getWarehouse, replenishBar, notification } = require('../Controllers/warehouseController');
const router = express.Router();

router.post('/', createInventory);
router.get('/', getWarehouse);
router.get('/getAllBeverages', getAllBeverages);
router.post('/replenishBar', replenishBar);
router.post('/notification',notification)


module.exports = router;