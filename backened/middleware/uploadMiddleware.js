const multer = require("multer");
const ApiError = require("../utils/apiError");

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const multerOption = () => {
  const multerStorage = multer.memoryStorage();

  //  filefilter configuration
  const multerFilter = function (req, file, cb) {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          "Only images are allowed (jpeg, png, gif) and size must be less than 2MB",
          400,
        ),
        false,
      );
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: MAX_FILE_SIZE },
  });
  return upload;
};

exports.uploadSingleImage = (fieldName) => {
  const upload = multerOption();
  return upload.single(fieldName);
};
