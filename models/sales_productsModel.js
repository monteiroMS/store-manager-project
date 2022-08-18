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

module.exports = {
  createSaleProducts,
};
