const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Blog = require("../models/Blog.model");

const fileUploader = require("../config/cloudinary.config");

//  POST /api/blogs  -  Creates a new blog
router.post("/blogs", (req, res, next) => {
/*   const { name, instructions, imgUrl } = req.body; */

  Blog.create(req.body)
  .then((createdBlog) => {
    console.log("Created new blog: ", createdBlog);
    res.status(200).json(createdBlog);
  })
  .catch((err) => next(err));
});

//  GET /api/blogs -  Retrieves all of the blogs
router.get("/blogs", (req, res, next) => {
  Blog.find()
    .then((allBlogs) => res.json(allBlogs))
    .catch((err) => res.json(err));
});

//  GET /api/blogs/:blogId -  Retrieves a specific blog by id
router.get("/blogs/:blogId", (req, res, next) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Blog.findById(blogId)
    .then((blog) => res.status(200).json(blog))
    .catch((error) => res.json(error));
});

router.post("/upload", fileUploader.single("imgUrl"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.

  res.json({ fileUrl: req.file.path });
});

// PUT  /api/blogs/:blogId  -  Updates a specific blog by id
router.put("/blogs/:blogId", (req, res, next) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Blog.findByIdAndUpdate(blogId, req.body, { new: true })
    .then((updatedBlog) => res.json(updatedBlog))
    .catch((error) => res.json(error));
});

// DELETE  /api/blogs/:blogId  -  Deletes a specific blog by id
router.delete("/blogs/:blogId", (req, res, next) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Blog.findByIdAndRemove(blogId)
    .then(() =>
      res.json({
        message: `Blog with ${blogId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
