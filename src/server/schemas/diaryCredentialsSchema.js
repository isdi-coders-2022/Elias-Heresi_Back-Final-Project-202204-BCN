const { Joi } = require("express-validation");

const credentialsEntrySchema = {
  body: Joi.object({
    date: Joi.date().messages({ message: "A Date is Required" }).required(),
    vitality: Joi.number().min(0).max(10).required(),
    positiveEmotion: Joi.number().min(0).max(10).required(),
    engagement: Joi.number().min(0).max(10).required(),
    meaning: Joi.number().min(0).max(10).required(),
    accomplishment: Joi.number().min(0).max(10).required(),
    relationships: Joi.number().min(0).max(10).required(),
    wellBeing: Joi.number().min(0).max(10).required(),
    commentary: Joi.string().max(100),
    image: Joi.string(),
  }),
};

module.exports = { credentialsEntrySchema };
