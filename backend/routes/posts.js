const express = require("express");
const { getFeedPosts, getUserPosts, likePost } = require("../controllers/posts.js");
const verification = require("../middleware/authorization.js");
const dotenv = require("dotenv");

const router = express.Router();

// read
router.get("/", verification, getFeedPosts); 
router.get("/:userId/posts", verification, getUserPosts); 

// update
router.patch("/:id/like", verification, likePost);

module.exports = router;