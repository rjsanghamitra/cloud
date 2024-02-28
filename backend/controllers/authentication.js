const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // this will give the user a web token that can be used by the user for authorization.
const User = require("../models/User.js");
const dotenv = require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60;
const createToken = async (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
    { algorithm: "HS256" }
  );
};

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const picture = req.file.buffer;

    console.log(req.file);
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picture,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    const token = await createToken(savedUser._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    const token = await createToken(user._id);
    console.log("after login: ", token);
    delete user.password;
    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .header("Authorization")
      .status(200)
      .json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
