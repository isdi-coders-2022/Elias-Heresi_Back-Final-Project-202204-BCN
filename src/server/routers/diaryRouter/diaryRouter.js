const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getEntries,
  deleteEntry,
  createEntry,
  editEntry,
  getEntryById,
  filterEntriesByDate,
  getUserEntries,
} = require("../../controllers/diaryControllers");
const { fileRename } = require("../../middlewares/fileRename");

const maxSize = 1000000;
const diaryRouter = express.Router();
const upload = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: maxSize },
});

diaryRouter.get("/all", getEntries);
diaryRouter.get("/entries", getUserEntries);
diaryRouter.get("/byId/:id", getEntryById);
diaryRouter.delete("/delete", deleteEntry);
diaryRouter.post("/", upload.single("image"), fileRename, createEntry);
diaryRouter.get("/date", filterEntriesByDate);

diaryRouter.patch(
  "/edit/:entryId",
  upload.single("image"),
  fileRename,
  editEntry
);

module.exports = { diaryRouter };
