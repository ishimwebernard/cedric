const Joi = require("joi")

module.exports = Joi.object({
    DesignerEmail: Joi.string().email().required(),
    CustomerEmail: Joi.string().email().required(),
    DesignerFiles: Joi.string().required(),
    CustomerFiles: Joi.string().required(),
    DesignerText: Joi.string().required(),
    CustomerText: Joi.string().required()
})