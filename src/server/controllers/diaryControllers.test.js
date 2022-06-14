const { createEntry, editEntry } = require("./diaryControllers");

describe("Given the createEntry controller", () => {
  describe("When invoked without the vitality property", () => {
    test("Then a response containing the error will be received", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: {
          userId: { username: "Daddy Yankee" },
        },
      };

      const next = jest.fn();
      await createEntry(req, res, next);

      const expectedError = new TypeError();
      expectedError.code = 403;
      expectedError.message = "Error creating entry";

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the editEntry controller", () => {
  describe("When invoked without the vitality property", () => {
    test("Then a response containing the error will be received", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: {
          userId: { username: "Daddy Yankee" },
        },
      };

      const next = jest.fn();
      await editEntry(req, res, next);

      const expectedError = new TypeError();
      expectedError.code = 403;
      expectedError.message = "Error editing entry";

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
