const fs = require("fs");
const path = require("path");
const debug = require("debug")("bonanza:server:middlewares:fileRename");

const fileRename = async (req, res, next) => {
  const { file, body: newEntry } = req;
  if (file) {
    const newFilename = `${file.originalname}-${Date.now()}`;
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newFilename),
      async (error) => {
        if (error) {
          const customError = new Error("Invalid uploaded file route");
          customError.statusCode = 401;
          next(customError);
        }
      }
    );
    newEntry.image = newFilename;
    next();
  }
};

module.exports = { fileRename };
