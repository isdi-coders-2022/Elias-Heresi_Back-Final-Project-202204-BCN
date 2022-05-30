require("dotenv").config();
const bcrypt = require("bcrypt");
const debug = require("debug")("gamersland:server:controllers:userControllers");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  const { name, surname, email, username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        surname,
        email,
        username,
        password: encryptedPassword,
      };

      await User.create(newUser);

      debug("User created successfully");
      res.status(201).json({ user: name });
    } else {
      const userError = new Error();
      userError.customMessage = "User name already exist";
      userError.statusCode = 409;
      next(userError);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };
