const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { video } = require("../middleware/cloudinary");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },

  getEdit: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("edit.ejs", { post: post, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  createPost: async (req, res) => {
    try {
  
      // const result = await cloudinary.uploader.upload(req.file.path, {
      //   resource_type: "video"
      // });
  
     const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video"
      });

      await Post.create({
        title: " ",
        artist: " ",
        image: "https://res.cloudinary.com/frog123/image/upload/v1664219868/GOTUNElogo_1_xtijg0.jpg",
        audio: result.secure_url,
        writers: " ",
        composers: " ",
        release: " ",
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set:{
          title: req.body.title,
          artist: req.body.artist,
          writers: req.body.writers,
          composers: req.body.composers,
          release: req.body.release}   
        }
      );
      console.log("Updated");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
