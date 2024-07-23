/** @format */
const Post = require("../models/posts");
const fs = require("fs");
const path = require("path");

module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //fetch post by ID
  static async fetchPostById(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //create a post
  static async createPost(req, res) {
    const post = req.body;
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    if (req.file && req.file.filename) {
      const imagename = req.file.filename;
      post.image = imagename;
    }
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post a created successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //update a post
  static async updatePost(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
    } else {
      new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image;

    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post Updated Successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  //delete a post
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      if (result && result.image) {
        const imagePath = "./uploads/" + result.image;
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
