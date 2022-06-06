const { Joi } = require("express-validation");

const credentialsEntrySchema = {
  body: Joi.object({
    date: Joi.date().required(),
    vitality: Joi.number().integer().min(0).max(10).required(),
    positiveEmotion: Joi.number().integer().min(0).max(10).required(),
    engagement: Joi.number().integer().min(0).max(10).required(),
    meaning: Joi.number().integer().min(0).max(10).required(),
    accomplishment: Joi.number().integer().min(0).max(10).required(),
    relationships: Joi.number().integer().min(0).max(10).required(),
    wellBeing: Joi.number().integer().min(0).max(10).required(),
    commentary: Joi.string(),
    image: Joi.string(),
  }),
};

module.exports = { credentialsEntrySchema };
