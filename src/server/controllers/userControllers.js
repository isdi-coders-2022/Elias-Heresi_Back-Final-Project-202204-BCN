require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const debug = require("debug")("gamersland:server:controllers:userControllers");
const User = require("../../database/models/User");

const encryptPassword = (password) => bcrypt.hash(password, 10);

const loginUser = async (req, res) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  const user = await User.findOne({ username });
  if (!user) {
    res.status(403).json({ msg: "User not found" });
    return;
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    res.status(401).json({ msg: "Incorrect username and/or password" });
    return;
  }

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

const registerUser = async (req, res, next) => {
  const { name, surname, email, username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const encryptedPassword = await encryptPassword(password);

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

module.exports = { registerUser, loginUser };
