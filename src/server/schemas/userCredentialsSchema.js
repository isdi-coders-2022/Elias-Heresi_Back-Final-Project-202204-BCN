const { Joi } = require("express-validation");

const credentialsRegisterSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(20)
      .messages({ message: "A name is required" })
      .required(),
    surname: Joi.string()
      .max(20)
      .messages({ message: "A surname is Required" })
      .required(),
    email: Joi.string()
      .max(30)
      .message({ message: "A valid email is required" })
      .email()
      .required(),
    username: Joi.string()
      .max(20)
      .messages({ message: "A Username is required" })
      .required(),
    password: Joi.string()
      .max(20)
      .regex(/[a-zA-Z0-9]{3,20}/)
      .messages({
        message:
          "A password containing a combination of 3-30 letters and numbers is required",
      })
      .required(),
  }),
};

module.exports = { credentialsRegisterSchema };
