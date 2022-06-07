const express = require("express");
const { validate } = require("express-validation");
const {
  getEntries,
  deleteEntry,
  createEntry,
  editEntry,
} = require("../../controllers/diaryControllers");
const {
  credentialsCreateEntrySchema,
  credentialsEditEntrySchema,
} = require("../../schemas/diaryCredentialsSchema");

const diaryRouter = express.Router();

diaryRouter.get("/all", getEntries);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", validate(credentialsCreateEntrySchema), createEntry);
diaryRouter.patch(
  "/edit/:entryId",
  validate(credentialsEditEntrySchema),
  editEntry
);

module.exports = { diaryRouter };
