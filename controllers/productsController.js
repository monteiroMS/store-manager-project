const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }
  
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};