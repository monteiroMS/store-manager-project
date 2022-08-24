const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().required(),
});

const idValidator = (req, res, next) => {
  const validation = schema.validate(req.params);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return res.status(400).json({ message });
  }

  next();
};

module.exports = idValidator;