const request = require("supertest");
const { mongoose } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../..");
const { mockToken, alternativeToken } = require("../../mocks/diary");
const User = require("../../../database/models/User");
const { Entry } = require("../../../database/models/Diary");
const connectDB = require("../../../database");

let mongoServer;
let users;
let inputtedEntries;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(users[0]);
  await Entry.create(inputtedEntries[0]);
  await Entry.create(inputtedEntries[1]);
  await Entry.create(inputtedEntries[2]);
});

afterEach(async () => {
  await User.deleteMany({});
  await Entry.deleteMany({});
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given the GET /all diary router", () => {
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
        mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      ],
    },
  ];

  inputtedEntries = [
    {
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
      date: new Date(2007, 1, 1),
      username: "marta",
      vitality: 1,
      positiveEmotion: 1,
      engagement: 2,
      relationships: 3,
      meaning: 4,
      accomplishment: 5,
      wellBeing: 4,
      image: "img",
      commentary: "Hola",
    },
    {
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
      date: new Date(2020, 1, 1),
      username: "marta",
      vitality: 1,
      positiveEmotion: 1,
      engagement: 2,
      relationships: 3,
      meaning: 4,
      accomplishment: 5,
      wellBeing: 4,
      image: "img",
      commentary: "Hola",
    },
    {
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
      date: new Date(2022, 1, 1),
      username: "marta",
      vitality: 1,
      positiveEmotion: 1,
      engagement: 2,
      relationships: 3,
      meaning: 4,
      accomplishment: 5,
      wellBeing: 4,
      image: "img",
      commentary: "Hola",
    },
  ];

  const startDate = "20100101";
  const endDate = "20210101";
  describe("When it receives a valid request startDate 2010 and endDate 2021", () => {
    test("Then a response containing 1 diary entry will be received", async () => {
      const {
        body: { entries },
      } = await request(app)
        .get(`/diary/entries?startDate=${startDate}&endDate=${endDate}`)
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedLength = 1;

      expect(entries).toHaveLength(expectedLength);
    });
  });
  describe("When the user doesn't exist", () => {
    test("Then a response with the message 'User not found' will be received", async () => {
      const response = await request(app)
        .get(`/diary/entries?startDate=${startDate}&endDate=${endDate}`)
        .set("Authorization", `Bearer ${alternativeToken}`);

      const expectedProperty = "msg";
      const expectedMessage = "User not found";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
});
