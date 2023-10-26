const Joi = require("joi")

module.exports = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
})