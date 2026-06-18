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

// register config
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
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// mount routes
app.use("/api/v1", imageRoute);

app.use((req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// run server
const server = app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`App running on port ${process.env.PORT || 8000}`);
});

// handle error outside the reigon of express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Erros: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
