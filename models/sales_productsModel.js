const connection = require('./connection');

const createSaleProducts = async (id, product) => {
  try {
    await connection.execute(`
      INSERT INTO StoreManager.sales_products
        (sale_id, product_id, quantity)
      VALUES
        (?, ?, ?);`,
      [id, product.productId, product.quantity]);
    return product;
  } catch (error) {
    return { message: error.message };
  }
};

const updateSale = async ({ quantity, productId, saleId }) => {
  try {
    const [response] = await connection.execute(`
      UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE product_id = ? AND sale_id = ?;
    `, [quantity, productId, saleId]);

    if (!response.affectedRows) throw new Error('Algo deu errado');

    return 200;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  createSaleProducts,
  updateSale,
};
