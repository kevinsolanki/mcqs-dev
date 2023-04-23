const Joi = require("joi");

exports.createNewTechSchema = Joi.object({
    techName: Joi.string().min(3).max(30).required(),

})

exports.deleteTechSchema = Joi.object({
    techId: Joi.string().hex().length(24).required()
})