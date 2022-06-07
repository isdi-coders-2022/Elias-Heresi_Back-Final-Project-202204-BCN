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

const getEntryById = async (req, res) => {
  const {
    userId: { username },
    params: { id },
  } = req;
  const diary = await User.findOne({ username });
  if (!diary) {
    res.status(403).json({ msg: "User not found" });
    return;
  }
  const entry = await Entry.findOne({ _id: id });
  if (!entry) {
    res.status(403).json({ msg: "Entry not found" });
    return;
  }
  debug(`${username}'s entries obtained successfully`);
  res.status(201).json({ entry });
};

const deleteEntry = async (req, res) => {
  const {
    userId: { username },
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

const createEntry = async (req, res, next) => {
  try {
    const {
      userId: { username },
      body: entry,
    } = req;

    const createdEntry = await Entry.create({ username, ...entry });

    await User.updateOne({ username }, { $push: { diary: createdEntry.id } });

    debug(`Entry was successfully added to ${username}'s diary`);
    res.status(201).json({
      id: createdEntry.id,
      msg: `The entry was successfully created in ${username}'s diary`,
    });
  } catch (error) {
    debug("Entry couldn't be created");
    error.message = "Error creating entry";
    error.code = 403;
    next(error);
  }
};

const editEntry = async (req, res, next) => {
  try {
    const {
      userId: { username },
      params: { entryId },
      body: modifiedEntry,
    } = req;
    await Entry.findByIdAndUpdate(entryId, modifiedEntry);
    debug(`Entry was successfully edited in ${username}'s diary`);
    res.status(201).json({
      msg: `The entry was successfully modified in ${username}'s diary`,
    });
  } catch (error) {
    debug("Entry couldn't be edited");
    error.message = "Error editing entry";
    error.code = 403;
    next(error);
  }
};

module.exports = {
  getEntries,
  getEntryById,
  deleteEntry,
  createEntry,
  editEntry,
};
