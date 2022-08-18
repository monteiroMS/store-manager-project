const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidator = require('../middlewares/productNameValidator');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', productNameValidator, productsController.createProduct);

module.exports = router;
