const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const debug = require("debug")("bonanza:server:middlewares:fileRename");

const fileRename = async (req, res, next) => {
  const { file, body: newEntry } = req;
  if (file) {
    const newFilename = `${Date.now()}-${file.originalname}`;
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newFilename),
      async (error) => {
        if (error) {
          debug(chalk.redBright("Invalid file route"));
          const customError = new Error("Invalid uploaded file route");
          customError.statusCode = 401;
          next(customError);
        }
      }
    );
    newEntry.image = newFilename;
    debug(chalk.green("Succesfully renamed file"));
  }
  next();
};

module.exports = { fileRename };
