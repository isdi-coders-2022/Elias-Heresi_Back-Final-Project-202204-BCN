const { Schema, model } = require("mongoose");

const EntrySchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  vitality: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  positiveEmotion: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  engagement: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  relationships: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  meaning: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  accomplishment: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  wellBeing: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  image: {
    type: String,
  },
  commentary: {
    type: String,
  },
});

const DiarySchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  diary: [EntrySchema],
});

const Entry = model("Entry", EntrySchema, "entries");
const Diary = model("Diary", DiarySchema, "diaries");

module.exports = { Entry, Diary };
