const express = require("express");
const { validate } = require("express-validation");
const { registerUser, loginUser } = require("../controllers/userControllers");
const {
  credentialsRegisterSchema,
  credentialsLoginSchema,
} = require("../schemas/userCredentialsSchema");

const userRouter = express.Router();

userRouter.post("/login", validate(credentialsLoginSchema), loginUser);
userRouter.post("/register", validate(credentialsRegisterSchema), registerUser);

module.exports = { userRouter };
