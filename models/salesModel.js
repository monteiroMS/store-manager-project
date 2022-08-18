const connection = require('./connection');

const serialize = ({ date, productId, quantity }) => ({
  date,
  productId,
  quantity,
});

const createSale = async () => {
  try {
    const [response] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (now());',
    );
    return response.insertId;
  } catch (error) {
    return { message: error.message };
  }
};

const getSales = async () => {
  try {
    const [sales] = await connection.execute(`
      SELECT
        s.id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id;
    `);
    return sales;
  } catch (error) {
    return { message: error.message };
  }
};

const getSaleById = async (id) => {
  try {
    const [sale] = await connection.execute(`
      SELECT
        s.id AS id,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE id = ?;
    `, [id]);
    if (!sale.length) throw new Error('Sale not found');
    return sale.map(serialize);
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
};
