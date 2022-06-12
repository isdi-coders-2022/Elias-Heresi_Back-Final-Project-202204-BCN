const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  deleteEntry,
  createEntry,
  editEntry,
  getEntryById,
  getUserEntries,
} = require("../../controllers/diaryControllers");
const { fileRename } = require("../../middlewares/fileRename");

const maxSize = 1000000;
const diaryRouter = express.Router();
const upload = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: maxSize },
});

diaryRouter.get("/entries", getUserEntries);
diaryRouter.get("/byId/:id", getEntryById);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", upload.single("image"), fileRename, createEntry);

diaryRouter.patch(
  "/edit/:entryId",
  upload.single("image"),
  fileRename,
  editEntry
);

module.exports = { diaryRouter };
