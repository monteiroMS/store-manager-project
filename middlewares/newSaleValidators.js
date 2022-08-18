const Joi = require('joi');
const productsService = require('../services/productsService');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
});

const bodyValidator = (req, res, next) => {
  const validation = [];

  req.body.forEach((sale) => {
    const response = schema.validate(sale);
    if (response.error) {
      const { message, type } = response.error.details[0];
      const err = { message, type };
      validation.push(err);
    }
  });

  if (validation.some((err) => err.message)) {
    const [{ message, type }] = validation;
    return type === 'any.required'
      ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

const checkProduct = async (req, res, next) => {
  const validation = await Promise.all(
    req.body.map(async ({ productId }) => {
      const product = await productsService.getById(productId);
      return product;
    }),
  );

  if (validation.some((product) => product.message)) {
    const err = validation.find((product) => product.message);
    return res.status(err.code).json({ message: err.message });
  }

  next();
};

module.exports = [
  bodyValidator,
  checkProduct,
];
