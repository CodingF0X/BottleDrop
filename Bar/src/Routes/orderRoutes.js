const express = require('express');
const { createOrder, getAllOrders } = require('../Controllers/orderController');

const router = express.Router();

router.post('/makeOrder/:barId', createOrder);
router.get('/', getAllOrders);

module.exports = router;
