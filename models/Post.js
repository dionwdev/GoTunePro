const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  audio: {
    type: String,
    require: true,
  },
  writers: {
    type: String,
    required: true,
  },
  composers: {
    type: String,
    required: true,
  },
  release: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);
