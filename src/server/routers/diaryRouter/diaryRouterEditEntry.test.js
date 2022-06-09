/* eslint-disable no-underscore-dangle */
const request = require("supertest");
const { mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../..");
const { mockToken } = require("../../mocks/diary");
const User = require("../../../database/models/User");
const { Entry } = require("../../../database/models/Diary");
const connectDB = require("../../../database");

let mongoServer;
let user;
let inputtedEntry;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(user);
  await Entry.create(inputtedEntry);
});

afterEach(async () => {
  await User.deleteMany({});
  await Entry.deleteMany({});
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given the PATCH /edit/:entryId diary router", () => {
  user = {
    name: "test",
    surname: "chocolatero",
    username: "marta",
    password: "$2a$10$NwtqJAOXVZ2z2.jIVU6vE.p2d6Elc0U2aAkhL.z7khu5aDZGpS6pm",
    email: "general@pete.com",
    diary: [mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
  };

  inputtedEntry = {
    username: "marta",
    _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
    vitality: 1,
    positiveEmotion: 1,
    engagement: 2,
    relationships: 3,
    meaning: 4,
    accomplishment: 5,
    wellBeing: 4,
    commentary: "Hola",
  };

  const requestBody = {
    date: "2020-11-10T23:00:00.000Z",
    vitality: 6,
    positiveEmotion: 5,
    engagement: 7,
    relationships: 7,
    meaning: 8,
    accomplishment: 9,
    wellBeing: 6,
    commentary: "Esta entrada se logró editar",
    image: "",
    backup: "",
  };

  describe("When it receives a request to edit the entry 507f1f77bcf86cd799439011", () => {
    test("Then marta's diary will contain only this entry", async () => {
      const entryId = "507f1f77bcf86cd799439011";

      await request(app)
        .patch(`/diary/edit/${entryId}`)
        .set("Authorization", `Bearer ${mockToken}`)
        .send(requestBody);

      const {
        body: { entries },
      } = await request(app)
        .get("/diary/all")
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedEntry = {
        ...requestBody,
        id: inputtedEntry._id.toString(),
        username: user.username,
        backup: "",
        image: "",
      };

      expect(entries[0]).toEqual(expectedEntry);
    });
  });
  describe("When it receives a request to edit the entry 507f1f77bcf86cd799439011", () => {
    test("Then marta's diary will contain only this entry", async () => {
      const entryId = "507f1f77bcf86cd799439011";

      await request(app)
        .patch(`/diary/edit/${entryId}`)
        .set("Authorization", `Bearer ${mockToken}`)
        .send(requestBody);

      const {
        body: { entries },
      } = await request(app)
        .get("/diary/all")
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedEntry = {
        ...requestBody,
        id: inputtedEntry._id.toString(),
        username: user.username,
      };

      expect(entries[0]).toEqual(expectedEntry);
    });
  });
});
