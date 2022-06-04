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
  await User.create(users[1]);
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

describe("Given the DELETE /delete diary router", () => {
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
    {
      name: "test 1",
      surname: "mene",
      username: "test",
      password: "$2b$10$04ih6gHPryUl3PN6as12bOa/YyTNH4uXpcFdnCGq9zsPclM3Z/BWG",
      email: "fontex9@hotmail.com",
      diary: [],
    },
  ];

  inputtedEntries = [
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
      image: "img",
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
      image: "img",
      commentary: "Hola",
    },
    {
      username: "marta",
      _id: mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
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
  describe("When it receives a request to delete the entry 507f1f77bcf86cd799439013", () => {
    test("Then user marta's diary will be reduced to 2 entries", async () => {
      const entryId = "507f1f77bcf86cd799439013";
      const requestBody = { entryId };

      await request(app)
        .delete("/diary/delete")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(requestBody);

      const {
        body: { entries },
      } = await request(app)
        .get("/diary/all")
        .set("Authorization", `Bearer ${mockToken}`);

      const expectedLength = 2;

      expect(entries).toHaveLength(expectedLength);
    });
  });
  describe("When the user doesn't exist", () => {
    test("Then a response with a message 'Diary entry not found' will be received", async () => {
      const entryId = "629a4a6e5a8e5b7744a72599";
      const requestBody = { entryId };

      const response = await request(app)
        .delete("/diary/delete")
        .set("Authorization", `Bearer ${mockToken}`)
        .send(requestBody);

      const expectedProperty = "msg";
      const expectedMessage = "Diary entry not found";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
  describe("When the entry doesn't correspond to the user", () => {
    test("Then a response with a message 'Diary entry not found' will be received", async () => {
      const entryId = "507f1f77bcf86cd799439013";
      const testToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3dXNlciIsInN1cm5hbWUiOiJ0ZXN0IiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU0MzQ5ODY4fQ.2YhwTdhJX4rrwUPPMLPMhYLmmKIpSDjx0C99CYD_8zU";
      const requestBody = { entryId };

      const response = await request(app)
        .delete("/diary/delete")
        .set("Authorization", `Bearer ${testToken}`)
        .send(requestBody);

      const expectedProperty = "msg";
      const expectedMessage =
        "Diary entry doesn't correspond to the current user";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
});
