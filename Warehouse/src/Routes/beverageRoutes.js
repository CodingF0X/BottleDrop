const express =  require('express');
const { createBeverage } = require('../Controllers/beverageController');
const router = express.Router();

router.post('/', createBeverage)

module.exports = router;