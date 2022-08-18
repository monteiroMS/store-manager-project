const salesModel = require('../models/salesModel');
const saleProductsModel = require('../models/sales_productsModel');

const createSale = async (products) => {
  const id = await salesModel.createSale();
  
  await Promise.all(
    products.map((product) => saleProductsModel.createSaleProducts(id, product)),
  );

  return {
    id,
    itemsSold: products,
  };
};

module.exports = {
  createSale,
};
