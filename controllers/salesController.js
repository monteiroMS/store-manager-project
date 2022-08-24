const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const newSales = await salesService.createSale(req.body);
  return res.status(201).json(newSales);
};

const getSale = async (_req, res) => {
  const sales = await salesService.getSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);

  if (sale.message) {
    return res.status(sale.code).json({ message: sale.message });
  }

  return res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const status = await salesService.deleteSale(id);

  if (status.message) {
    return res.status(status.code).json({ message: status.message });
  }

  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const products = [...req.body];

  const itemsUpdated = await salesService.updateSale(id, products);

  if (itemsUpdated.message) {
    return res.status(itemsUpdated.code).json({ message: itemsUpdated.message });
  }

  return res.status(200).json(itemsUpdated);
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  deleteSale,
  updateSale,
};
