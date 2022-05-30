const express = require("express");
const { validate } = require("express-validation");
const { registerUser } = require("../controllers/userControllers");
const {
  credentialsRegisterSchema,
} = require("../schemas/userCredentialsSchema");

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validate(credentialsRegisterSchema),
  registerUser
);

module.exports = { usersRouter };
