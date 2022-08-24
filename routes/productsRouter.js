const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidator = require('../middlewares/productNameValidator');
const productUpdateValidator = require('../middlewares/productUpdateValidatior');
const productDeleteValidator = require('../middlewares/productDeleteValidator');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', productNameValidator, productsController.createProduct)
  .put('/:id', [
    productUpdateValidator,
    productNameValidator,
  ], productsController.updateProduct)
  .delete('/:id', productDeleteValidator, productsController.deleteProduct);

module.exports = router;
