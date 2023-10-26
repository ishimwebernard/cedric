const Joi = require("joi")

module.exports = Joi.object({
    Type: Joi.string().required(),
    OrganizationName: Joi.string().required(),
    Status: Joi.number().required(),
    Files: Joi.string().required()
})