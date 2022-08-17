const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().min(5),
});

const productNameValidator = (req, res, next) => {
  const validator = schema.validate(req.body);

  if (validator.error) {
    const { message, type } = validator.error.details[0];
    const err = { message };
    if (type === 'any.required') return res.status(400).json(err);
    return res.status(422).json(err);
  }

  next();
};

module.exports = productNameValidator;
