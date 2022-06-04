const express = require("express");
const {
  getEntries,
  deleteEntry,
} = require("../../controllers/diaryControllers");

const diaryRouter = express.Router();

diaryRouter.get("/all", getEntries);
diaryRouter.delete("/delete", deleteEntry);

module.exports = { diaryRouter };
