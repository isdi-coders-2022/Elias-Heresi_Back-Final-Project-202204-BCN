const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");
const {
  getEntries,
  deleteEntry,
  createEntry,
  editEntry,
  getEntryById,
} = require("../../controllers/diaryControllers");
const { fileRename } = require("../../middlewares/fileRename");

const diaryRouter = express.Router();
const upload = multer({ dest: path.join("uploads", "images") });

diaryRouter.get("/all", getEntries);
diaryRouter.get("/byId/:id", getEntryById);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", upload.single("image"), fileRename, createEntry);

diaryRouter.patch("/edit/:entryId", editEntry);

module.exports = { diaryRouter };
