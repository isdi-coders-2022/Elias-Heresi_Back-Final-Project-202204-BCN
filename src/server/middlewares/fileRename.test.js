const fs = require("fs");
const path = require("path");
const { fileRename } = require("./fileRename");

jest.mock("fs");
jest.mock("path");

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("returnedRef"),
  uploadBytes: jest.fn().mockResolvedValue(),
  getStorage: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("firebaseUrl"),
}));

describe("Given the fileRename function", () => {
  describe("When invoked with an image", () => {
    test("Then the next function won't be called", async () => {
      const next = jest.fn();
      fs.rename.mockImplementation((oldpath, newpath, callback) => {
        callback();
      });
      fs.readFile.mockImplementation((file, callback) => {
        callback();
      });
      path.join.mockImplementation(() => {});

      const req = {
        file: {
          destination: "uploads/images",
          encoding: "7bit",
          fieldname: "images",
          filename: "modifiedFilename",
          mimetype: "image/png",
          originalname: "originalFilename.png",
          path: "uploads/images/modifiedFilename",
          size: 1000,
        },
      };

      await fileRename(req, null, next);

      expect(next).not.toHaveBeenCalled();
    });
  });
});
