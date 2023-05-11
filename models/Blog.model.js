const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: String,
  date: String,
  imgUrl: { type: String, default: "../images/quill.jpg" },
  isVegetarian: Boolean,
  isVegan: Boolean,
});

module.exports = model("Blog", blogSchema);
