require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const { Diary } = require("../../database/models/Diary");

const getEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const diary = await Diary.findOne({ username });
  if (!diary) {
    res.status(403).json({ msg: "User entries not found" });
    return;
  }

  debug("All entries obtained successfully");
  res.status(201).json(diary);
};

module.exports = { getEntries };
