const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  if (products.message) return res.status(500).json(products);

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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.createProduct(name);

  if (product.message) {
    return res.status(product.code).json({ message: product.message });
  }

  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const status = await productsService.updateProduct(name, id);

  if (status.message) {
    return res.status(status.code).json({ message: status.message });
  }

  return res.status(status).json({ id, name });
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};