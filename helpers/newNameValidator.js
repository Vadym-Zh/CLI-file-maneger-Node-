const Joi = require("joi");

const newNameValidator = (data) => {
  const schema = Joi.object({
    newName: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = newNameValidator;
