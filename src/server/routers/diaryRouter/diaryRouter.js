const express = require("express");
const { validate } = require("express-validation");
const {
  getEntries,
  deleteEntry,
  createEntry,
  editEntry,
  getEntryById,
} = require("../../controllers/diaryControllers");
const {
  credentialsCreateEntrySchema,
} = require("../../schemas/diaryCredentialsSchema");

const diaryRouter = express.Router();

diaryRouter.get("/all", getEntries);
diaryRouter.get("/byId/:id", getEntryById);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", validate(credentialsCreateEntrySchema), createEntry);
diaryRouter.patch(
  "/edit/:entryId",
  validate(credentialsCreateEntrySchema),
  editEntry
);

module.exports = { diaryRouter };
