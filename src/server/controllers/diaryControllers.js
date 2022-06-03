require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const { Entry } = require("../../database/models/Diary");
const User = require("../../database/models/User");

const getEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const { diary } = await User.findOne({ username });
  if (!diary) {
    res.status(403).json({ msg: "User entries not found" });
    return;
  }
  const entries = await Entry.find({ _id: diary });
  debug(`${username}'s entries obtained successfully`);
  res.status(201).json({ entries });
};

module.exports = { getEntries };
