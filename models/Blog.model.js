const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: String,
  date: String,
  content: String,
  imgUrl: { type: String, default: "../images/quill.jpg" },
});

module.exports = model("Blog", blogSchema);
