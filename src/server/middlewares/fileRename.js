const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const debug = require("debug")("bonanza:server:middlewares:fileRename");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhNC0Ockd0v4be8BFfZyz6O8rHc1ANfIY",
  authDomain: "bonanza-8814d.firebaseapp.com",
  projectId: "bonanza-8814d",
  storageBucket: "bonanza-8814d.appspot.com",
  messagingSenderId: "362430969622",
  appId: "1:362430969622:web:d1753c6c4a63a0f7d90237",
};

const firebaseApp = initializeApp(firebaseConfig);

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
        fs.readFile(
          path.join("uploads", "images", newFilename),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
            }
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, newFilename);
            debug(storageRef);

            await uploadBytes(storageRef, readFile);
            const firebaseFileURL = await getDownloadURL(storageRef);

            req.firebaseFileURL = firebaseFileURL;
            req.newFilename = newFilename;
            debug(chalk.green("Succesfully uploaded file to firebase"));
            next();
          }
        );
      }
    );
    newEntry.image = newFilename;
    debug(chalk.green("Succesfully renamed file"));
  }
  next();
};

module.exports = { fileRename };
