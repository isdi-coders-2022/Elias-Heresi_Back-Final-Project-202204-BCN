require("dotenv").config();
const debug = require("debug")("bonanza:server:controllers:diary");
const path = require("path");
const { Entry } = require("../../database/models/Diary");
const User = require("../../database/models/User");
const { convertToDate } = require("../utils/convertToDate");

const getUserEntries = async (req, res) => {
  const {
    userId: { username },
  } = req;
  const diary = await User.findOne({ username });
  if (!diary) {
    res.status(403).json({ msg: "User not found" });
    return;
  }

  const page = +(req.query?.page || 0);
  const perPage = +(req.query?.perPage || 100);

  const startDateAsNumber = req.query?.startDate || "19000101";
  const endDateAsNumber = req.query?.endDate || "21000101";
  const startDate = convertToDate(startDateAsNumber);
  const endDate = convertToDate(endDateAsNumber);

  const entries = await Entry.find({
    _id: diary.diary,
    date: { $gt: startDate, $lt: endDate },
  })
    .skip(page * perPage)
    .limit(perPage);
  debug(`${username}'s entries obtained successfully`);

  const numberOfEntries = diary.diary.length;

  let nextPageRoute = null;
  let previousPageRoute = null;
  if (perPage * (page + 1) < numberOfEntries) {
    const nextPage = page + 1;
    nextPageRoute = `${process.env.LOCAL_API_URL}diary/all?perPage=${perPage}&page=${nextPage}&startDate=${startDateAsNumber}&endDate=${endDateAsNumber}`;
  }
  if (page > 0) {
    const previousPage = page - 1;
    previousPageRoute = `${process.env.LOCAL_API_URL}diary/all?perPage=${perPage}&page=${previousPage}&startDate=${startDateAsNumber}&endDate=${endDateAsNumber}`;
  }

  const pagination = { previous: previousPageRoute, next: nextPageRoute };
  res.status(201).json({ numberOfEntries, entries, pagination });
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
      file,
      firebaseFileURL,
      newFilename,
    } = req;

    const modifiedEntry = {
      username,
      ...entry,
      image: file ? path.join("uploads", "images", newFilename) : "",
      backup: file ? firebaseFileURL : "",
    };

    const createdEntry = await Entry.create(modifiedEntry);

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
      body: entry,
      file,
      firebaseFileURL,
      newFilename,
    } = req;

    const modifiedEntry = {
      username,
      ...entry,
      image: file ? path.join("uploads", "images", newFilename) : "",
      backup: file ? firebaseFileURL : "",
    };

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
  getEntryById,
  deleteEntry,
  createEntry,
  editEntry,
  getUserEntries,
};
