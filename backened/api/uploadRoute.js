const express = require("express");
const router = express.Router();
const {
  getImage,
  resizeImage,
  saveImage,
  uploadImage,
} = require("../controller/uploadController");

router.route("/download/:id").get(getImage);
router.route("/upload").post(uploadImage, resizeImage, saveImage);

module.exports = router;
