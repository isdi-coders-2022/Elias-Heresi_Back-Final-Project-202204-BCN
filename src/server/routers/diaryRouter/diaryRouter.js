const express = require("express");
const { validate } = require("express-validation");
const {
  getEntries,
  deleteEntry,
  createEntry,
} = require("../../controllers/diaryControllers");
const {
  credentialsEntrySchema,
} = require("../../schemas/diaryCredentialsSchema");

const diaryRouter = express.Router();

diaryRouter.get("/all", getEntries);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", validate(credentialsEntrySchema), createEntry);

module.exports = { diaryRouter };
