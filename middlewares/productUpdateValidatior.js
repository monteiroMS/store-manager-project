const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  id: Joi.number().required(),
});

const productUpdateValidator = (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const params = { name, id };
  const response = schema.validate(params);

  if (response.error) {
    const { message, type } = response.error.details[0];
    return type === 'any.required'
      ? res.status(400).json({ message })
      : res.status(404).json({ message });
  }

  next();
};

module.exports = productUpdateValidator;