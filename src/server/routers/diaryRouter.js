const express = require("express");
const { getEntries } = require("../controllers/diaryControllers");

const diaryRouter = express.Router();

diaryRouter.get("/all", getEntries);

module.exports = { diaryRouter };
