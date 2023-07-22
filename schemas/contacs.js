const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(/^[\d\+][\d\(\)\ -]{4,14}\d$/, { name: "numbers" })
    .required(),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;
