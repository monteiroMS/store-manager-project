const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

const productNameValidator = (req, res, next) => {
  const validator = schema.validate(req.body);

  if (validator.error) {
    const { message } = validator.error.details[0];
    const err = { message };
    return res.status(400).json(err);
  }

  next();
};

module.exports = productNameValidator;
