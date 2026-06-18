const { v4 } = require("uuid");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadMiddleware");
const ImageModel = require("../models/ImageModel");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `upload-${v4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/images/${filename}`);
    req.body.image = filename;
  }
  next();
});

exports.uploadImage = uploadSingleImage("image");

exports.getImage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const image = await ImageModel.findById(id);
  if (!image) {
    return next(new ApiError("Image not found", 404));
  }
  res.status(200).json({ success: true, data: image });
});

exports.saveImage = asyncHandler(async (req, res, next) => {
  const { image } = req.body;
  const newImage = await ImageModel.create({ image });
  res.status(201).json({ success: true, data: newImage });
});
