require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const { Diary } = require("../../database/models/Diary");

const getEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const response = await Diary.findOne({ username });
  if (!response) {
    res.status(403).json({ msg: "User entries not found" });
    return;
  }

  debug(`${response.username}'s entries obtained successfully`);
  res.status(201).json(response.diary);
};

module.exports = { getEntries };
