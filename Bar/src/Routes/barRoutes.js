const express = require('express');
const { createBar, getBarDetails, getAllBars, updateStock } = require('../Controllers/barController');
const validateObjectId = require('../Middleware/validateObjectId');
const { fetchDataFromWarehouse_Service } = require('../config/serviceHelper');
const router = express.Router();

router.get('/getAllBeverages', async (req, res) => {
    try {
        const data = await fetchDataFromWarehouse_Service()
        res.send(data);
      } catch (err) {
        res.status(500).send('Failed to fetch data from Warehouse Microservice');
      }

})
router.post('/', createBar)
router.get('/getAllBars', getAllBars)
router.get('/:id',validateObjectId, getBarDetails)
router.patch('/:id',validateObjectId, updateStock)

module.exports = router;