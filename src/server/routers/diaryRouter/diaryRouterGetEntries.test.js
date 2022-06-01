const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../..");
const { Diary } = require("../../../database/models/Diary");
const connectDB = require("../../../database");
const { mockDiary, mockToken } = require("../../mocks/diary");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  Diary.create(mockDiary);
});

afterEach(async () => {
  await Diary.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET '/all' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should contain a diary in its response", async () => {
      const response = await request(app)
        .get("/diary/all")
        .set("Authorization", `Bearer ${mockToken}`);

      const searchedProperty = "commentary";
      const searchedValue =
        "Had a good day at the office. Excited on what is coming";
      expect(response.body[0]).toHaveProperty(searchedProperty, searchedValue);
    });
  });
});
