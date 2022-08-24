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

const createProduct = async (name) => {
  try {
    const [response] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
    return response.insertId;
  } catch (error) {
    return {
      message: error.sqlMessage,
      code: error.code,
    };
  }
};

const updateProduct = async (name, id) => {
  try {
    const [response] = await connection.execute(`
      UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?;
    `, [name, id]);
    if (!response.affectedRows) throw new Error('Product not found');
    return 200;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};
