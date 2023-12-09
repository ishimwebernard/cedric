const Joi = require("joi")

module.exports = Joi.object({
    DesignId:  Joi.number(),
    CustomerEmail: Joi.string().email().required(),
    DesignerEmail: Joi.string().email().required(),
    CustomerText: Joi.string().required()
})