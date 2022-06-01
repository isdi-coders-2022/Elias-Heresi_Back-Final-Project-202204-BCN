const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../..");

const User = require("../../../database/models/User");
const connectDB = require("../../../database");

let mongoServer;
let users;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(users[0]);
  await User.create(users[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/login' endpoint", () => {
  describe("When it receives a valid request", () => {
    users = [
      {
        name: "test",
        surname: "chocolatero",
        username: "andrea82",
        password:
          "$2a$10$NwtqJAOXVZ2z2.jIVU6vE.p2d6Elc0U2aAkhL.z7khu5aDZGpS6pm",
        email: "general@pete.com",
      },
      {
        name: "test 1",
        surname: "mene",
        username: "sindresmaster",
        password:
          "$2a$10$4iHWHlFBQ/1VbzyQ0B5tj.C78eC.msM1NL7wL3nrdkTT8IBfFRQ3a",
        email: "fontex9@hotmail.com",
      },
    ];

    const userRequestReceived = {
      username: "andrea82",
      password: "ap1234",
    };

    test("Then it should specify json as the content type in the http header", async () => {
      const response = await request(app)
        .post("/user/login")
        .send(userRequestReceived);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Then it should contain a token in the response body", async () => {
      const response = await request(app)
        .post("/user/login")
        .send(userRequestReceived);

      expect(response.body.token).toBeDefined();
    });
  });
  describe("When it receives a request with a non-existing user", () => {
    test("Then an error with a 'User not found' message will be received", async () => {
      const userRequestReceived = {
        username: "no_existe",
        password: "inexistente",
      };

      const response = await request(app)
        .post("/user/login")
        .send(userRequestReceived);

      const expectedProperty = "msg";
      const expectedMessage = "User not found";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
  describe("When it receives a request with an incorrect password", () => {
    test("Then an error with a 'Incorrect username and/or password' message will be received", async () => {
      const userRequestReceived = {
        username: "andrea82",
        password: "incorrect_password",
      };

      const response = await request(app)
        .post("/user/login")
        .send(userRequestReceived);

      const expectedProperty = "msg";
      const expectedMessage = "Incorrect username and/or password";
      expect(response.body).toHaveProperty(expectedProperty, expectedMessage);
    });
  });
});
