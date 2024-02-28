const express = require("express");
const {
  getUser,
  getUserFriends,
  addOrRemoveFriend,
} = require("../controllers/users.js");
const verification = require("../middleware/authorization.js");
const dotenv = require("dotenv");

const router = express.Router();

/* read */
router.get("/:id", verification, getUser);          
router.get("/:id/friends", verification, getUserFriends);     

/* update */
router.patch("/:id/:friendId", verification, addOrRemoveFriend);    
module.exports = router;