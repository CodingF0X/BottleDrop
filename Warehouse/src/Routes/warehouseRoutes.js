const express = require('express');
const { createInventory } = require('../Controllers/warehouseController');
const router = express.Router();

router.post('/', createInventory)


module.exports = router;