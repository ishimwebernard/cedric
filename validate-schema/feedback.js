const Joi = require("joi")

module.exports = Joi.object({
    DesignId:  Joi.number(),
    CustomerEmail: Joi.string().email().required(),
    CustomerFiles: Joi.string().required(),
    CustomerText: Joi.string().required()
})