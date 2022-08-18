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

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (sale.message) {
    return { code: 404, message: sale.message };
  }

  return sale;
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
};
