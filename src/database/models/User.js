const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  diary: { type: [SchemaTypes.ObjectId], ref: "Entry", default: [] },
});

const User = model("User", UserSchema, "users");

module.exports = User;
