const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image url is required"],
    },
  },
  {
    timestamps: true,
  },
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/images/${doc.image}`;
    doc.image = imageUrl;
  }
};

imageSchema.post("init", (doc) => setImageUrl(doc));
imageSchema.post("save", (doc) => setImageUrl(doc));

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
