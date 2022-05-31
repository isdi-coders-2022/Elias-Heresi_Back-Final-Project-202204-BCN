const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("..");

const User = require("../../database/models/User");
const connectDB = require("../../database");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/register' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should receive the created user object", async () => {
      const newUserData = {
        name: "paco",
        surname: "delgado",
        email: "paco@delgado.com",
        username: "paco",
        password: "paco",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUserData)
        .expect(201);

      expect(body.user).toBe(newUserData.name);
    });
  });

  describe("When it receives a request with an existing user", () => {
    test("Then it should call the response method status code 409", async () => {
      const newUserData = {
        name: "paco",
        surname: "delgado",
        email: "paco@delgado.com",
        username: "paco",
        password: "paco",
      };

      await User.create(newUserData);

      await request(app).post("/user/register").send(newUserData).expect(409);
    });
  });
});
