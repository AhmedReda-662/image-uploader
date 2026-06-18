const multer = require("multer");
const ApiError = require("../utils/apiError");

const handleJWTError = () => {
  throw new ApiError("Invalid token, please login again", 401);
};

const handleJWTExpiredError = () => {
  throw new ApiError("Your token has expired, please login again", 401);
};

const handleMulterError = (err) => {
  switch (err.code) {
    case "LIMIT_FILE_SIZE":
      return new ApiError("Image must not be larger than 2MB", 400);
    case "LIMIT_UNEXPECTED_FILE":
      return new ApiError("Only one image can be uploaded at a time", 400);
    default:
      return new ApiError("Invalid upload request", 400);
  }
};

const globalError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    err = handleMulterError(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {
      err = handleJWTError();
    }

    if (err.name === "TokenExpiredError") {
      err = handleJWTExpiredError();
    }

    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalError;
