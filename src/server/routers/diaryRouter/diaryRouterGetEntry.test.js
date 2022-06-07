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
});

afterEach(async () => {
  await User.deleteMany({});
  await Entry.deleteMany({});
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given the GET /byId/:id diary router", () => {
  users = [
    {
      name: "test",
      surname: "chocolatero",
      username: "marta",
      password: "$2a$10$NwtqJAOXVZ2z2.jIVU6vE.p2d6Elc0U2aAkhL.z7khu5aDZGpS6pm",
      email: "general@pete.com",
      diary: [mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
    },
  ];

  inputtedEntries = [
    {
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
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
  const entryId = "507f1f77bcf86cd799439011";
  describe("When it receives a valid request", () => {
    test("Then a response containing the same diary entry will be received, having the same requested id", async () => {
      const {
        body: { entry },
      } = await request(app)
        .get(`/diary/byId/${entryId}`)
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedProperties = ["id"];

      expect(entry).toHaveProperty(expectedProperties[0], entryId);
    });
  });

  describe("When the user doesn't exist", () => {
    test("Then a response with the message 'User not found' will be received", async () => {
      const response = await request(app)
        .get(`/diary/byId/${entryId}`)
        .set("Authorization", `Bearer ${alternativeToken}`);

      const expectedProperty = "msg";
      const expectedMessage = "User not found";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });

  describe("When the entry doesn't exist", () => {
    test("Then a response with the message 'User not found' will be received", async () => {
      const nonExistingId = "507f1f77bcf96cd799439011";

      const response = await request(app)
        .get(`/diary/byId/${nonExistingId}`)
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedProperty = "msg";
      const expectedMessage = "Entry not found";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
});
