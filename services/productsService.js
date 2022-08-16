const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return { code: 404, message: 'Product not found' };

  return product;
};

const createProduct = async (name) => {
  const id = await productsModel.createProduct(name);
  
  if (id.message) return { code: 500, message: id.message, errorCode: id.code };

  return { id, name };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
