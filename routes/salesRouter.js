const express = require('express');
const salesController = require('../controllers/salesController');
const newSaleValidator = require('../middlewares/newSaleValidator');

const router = express.Router();

router.post('/', newSaleValidator, salesController.createSale);

module.exports = router;
