const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConfig");

// routes
const imageRoute = require("./api/uploadRoute");

// error handling
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleware");

dotenv.config({ path: "config.env" });

// connect db
dbConnection();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1", imageRoute);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// global error handler
app.use(globalError);

module.exports = app;
