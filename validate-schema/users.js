const Joi = require("joi")

module.exports = Joi.object({
    Username: Joi.string().required(),
    Email: Joi.string().email().required(),
    Phone: Joi.string().required(),
    Location: Joi.string().required(),
    Role: Joi.number().required(),
    Password: Joi.string().required()
})