const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const newSales = await salesService.createSale(req.body);
  return res.status(201).json(newSales);
};

module.exports = {
  createSale,
};
