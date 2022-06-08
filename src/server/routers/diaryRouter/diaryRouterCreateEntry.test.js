const request = require("supertest");
const { mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../..");
const { mockToken } = require("../../mocks/diary");
const User = require("../../../database/models/User");
const { Entry } = require("../../../database/models/Diary");
const connectDB = require("../../../database");

let mongoServer;
let users;
let existingEntries;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(users[0]);
  await User.create(users[1]);
  await Entry.create(existingEntries[0]);
  await Entry.create(existingEntries[1]);
});

afterEach(async () => {
  await User.deleteMany({});
  await Entry.deleteMany({});
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given the POST / diary router", () => {
  users = [
    {
      name: "test",
      surname: "chocolatero",
      username: "marta",
      password: "$2a$10$NwtqJAOXVZ2z2.jIVU6vE.p2d6Elc0U2aAkhL.z7khu5aDZGpS6pm",
      email: "general@pete.com",
      diary: [
        mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      ],
    },
    {
      name: "test 1",
      surname: "mene",
      username: "test",
      password: "$2b$10$04ih6gHPryUl3PN6as12bOa/YyTNH4uXpcFdnCGq9zsPclM3Z/BWG",
      email: "fontex9@hotmail.com",
      diary: [],
    },
  ];

  existingEntries = [
    {
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
    },
    {
      username: "marta",
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      vitality: 1,
      positiveEmotion: 1,
      engagement: 2,
      relationships: 3,
      meaning: 4,
      accomplishment: 5,
      wellBeing: 4,
      commentary: "Hola",
    },
  ];
  describe("When it receives a request to add a new entry to martas's diary", () => {
    test("Then user marta's diary will increase to 3 entries", async () => {
      const requestBody = {
        date: "12/11/2020",
        vitality: 1,
        positiveEmotion: 1,
        engagement: 2,
        relationships: 3,
        meaning: 4,
        accomplishment: 5,
        wellBeing: 4,
        commentary: "New entry",
      };

      await request(app)
        .post("/diary/")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(requestBody);

      const {
        body: { entries },
      } = await request(app)
        .get("/diary/all")
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedLength = 3;

      expect(entries).toHaveLength(expectedLength);
    });
  });
});
