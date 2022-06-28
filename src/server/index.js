const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const { userRouter } = require("./routers/userRouter/userRouter");
const { diaryRouter } = require("./routers/diaryRouter/diaryRouter");
const { auth } = require("./middlewares/auth");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "http://localhost:8080",
    "https://bonanza-elias-heresi.netlify.app",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/user", userRouter);
app.use("/diary", auth, diaryRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
