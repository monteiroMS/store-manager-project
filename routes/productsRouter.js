const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidator = require('../middlewares/productNameValidator');
const productUpdateValidator = require('../middlewares/productUpdateValidatior');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', productNameValidator, productsController.createProduct)
  .put('/:id', [
    productUpdateValidator,
    productNameValidator,
  ], productsController.updateProduct);

module.exports = router;
