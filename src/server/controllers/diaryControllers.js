require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const { Entry } = require("../../database/models/Diary");

const getEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const response = await Entry.find({ username });
  if (!response) {
    res.status(403).json({ msg: "User entries not found" });
    return;
  }
  debug(`${response}'s entries obtained successfully`);
  res.status(201).json({ diary: response });
};

module.exports = { getEntries };
