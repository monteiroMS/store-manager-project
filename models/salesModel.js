const connection = require('./connection');

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

module.exports = {
  createSale,
};
