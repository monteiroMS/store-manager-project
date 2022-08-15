const connection = require('./connection');

const getAll = async () => {
  try {
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products ORDER BY id;',
    );
    return products;
  } catch (error) {
    return { message: error.message };
  }
};

const getById = async (id) => {
  try {
    const [product] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [id],
    );
    return product[0];
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getAll,
  getById,
};
