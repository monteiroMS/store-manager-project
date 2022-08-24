const express = require('express');
const salesController = require('../controllers/salesController');
const newSaleValidators = require('../middlewares/newSaleValidators');

const router = express.Router();

router
  .get('/', salesController.getSale)
  .get('/:id', salesController.getSaleById)
  .post('/', newSaleValidators, salesController.createSale)
  .delete('/:id', salesController.deleteSale);

module.exports = router;
