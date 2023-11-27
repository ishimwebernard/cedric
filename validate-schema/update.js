const Joi = require("joi")

module.exports = Joi.object({
        Status: Joi.number().required()
})