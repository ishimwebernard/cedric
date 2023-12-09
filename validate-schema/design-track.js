const Joi = require("joi")

module.exports = Joi.object({
    Description: Joi.string().required(),
    DesignerEmail: Joi.string().required(),
    CustomerEmail: Joi.string().required(),
    Status: Joi.number().required(),
    Files: Joi.string().required()
})