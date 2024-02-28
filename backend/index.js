const express = require("express");
const bodyParser = require("body-parser"); // a middleware library to parse incoming request bodies
const mongoose = require("mongoose");
const cors = require("cors"); // stands for cross origin resource sharing. a security policy that prevents malicious websites from making requests on behalf of a user.
const dotenv = require("dotenv");
const multer = require("multer"); // a middleware for handling file uploads
const helmet = require("helmet"); // provides security related http headers for express applications
const morgan = require("morgan"); // used for logging
const path = require("path");
const { register } = require("./controllers/authentication.js");
const authRoutes = require("./routes/authentication.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const verification = require("./middleware/authorization.js");
const { createPost } = require("./controllers/posts.js");
const passportSetup = require("./controllers/passport-setup.js");
const cookieSession = require('cookie-session');
const passport = require("passport");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieSession({
  maxAge: 7*24*60*60*1000,
  keys: [process.env.COOKIE_KEY]
}));
app.use(cookieParser());

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verification, upload.single("picture"), createPost);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log("connected");
    });
  })
  .catch((error) => console.log(error));