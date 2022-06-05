require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const { Entry } = require("../../database/models/Diary");
const User = require("../../database/models/User");

const getEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const diary = await User.findOne({ username });
  if (!diary) {
    res.status(403).json({ msg: "User not found" });
    return;
  }
  const entries = await Entry.find({ _id: diary.diary });
  debug(`${username}'s entries obtained successfully`);
  res.status(201).json({ entries });
};

const deleteEntry = async (req, res) => {
  const {
    userId: { username },
  } = req;

  const {
    body: { entryId },
  } = req;

  const entry = await Entry.findById(entryId);
  if (!entry) {
    res.status(403).json({ msg: "Diary entry not found" });
    return;
  }

  const { diary } = await User.findOne({ username });
  if (!diary.includes(entryId)) {
    res
      .status(403)
      .json({ msg: "Diary entry doesn't correspond to the current user" });
    return;
  }

  await Entry.findByIdAndDelete(entryId);
  await User.updateOne({ username }, { $pull: { diary: entryId } });

  debug(`Entry with id ${entryId}'s was deleted successfully`);
  res.status(201).json({ msg: "Entry was deleted successfully" });
};

const createEntry = async (req, res) => {
  res.status(201).json({ msg: "The entry was created successfully" });
};

module.exports = { getEntries, deleteEntry, createEntry };
