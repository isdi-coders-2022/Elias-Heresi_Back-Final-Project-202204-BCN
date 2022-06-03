// const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
// const app = require("../..");
const { Entry } = require("../../../database/models/Diary");
const connectDB = require("../../../database");
const { mockDiary } = require("../../mocks/diary");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  Entry.create(mockDiary.entries[0]);
});

afterEach(async () => {
  await Entry.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET '/all' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should contain a diary in its response, with a single entry", async () => {
      // const response = await request(app)
      //   .get("/diary/all")
      //   .set("Authorization", `Bearer ${mockToken}`);
      // debugger;
      // const searchedProperty = "entries";
      // const expectedLength = 1;
      // expect(response.body).toHaveProperty(searchedProperty);
      // expect(response.body.entries).toHaveLength(expectedLength);
    });
  });
});
