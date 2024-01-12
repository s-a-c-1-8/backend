const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
const User = require("./models/user");
var nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const mongo_URI =
  "mongodb+srv://SAC:G8BO4x3rWEDFSYqk@cluster0.btu1pyt.mongodb.net/jan-sac";
mongoose
  .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected To DB");
  })
  .catch((err) => console.error(err));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sachindenki98@gmail.com",
    pass: "iqtu cmvp hdip ergb",
  },
});

app.post("/create_user", upload.single("image"), async (req, res) => {
  console.log(req.file);
  let body = JSON.parse(req.body.body);
  console.log(body);

  const { name, email, mobile, amount, gender, password } = body;
  let userData = {
    name: name,
    email: email,
    mobile: mobile,
    amount: amount,
    gender: gender,
    password: password,
  };
  const insertedUser = await User.create(userData);
  console.log(insertedUser);
  var mailOptions = {
    from: "sachindenki@gmail.com",
    to: `${insertedUser.email}`,
    subject: "Testing email!",
    text: "Thank you for registering!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    password: req.body.password,
    email: req.body.email,
  });
  if (user) {
    console.log("found");
  }
  if (!user) {
    console.log("not found");
  }
});

app.get("/user_list", async (req, res) => {
  const userList = await User.find();
  console.log(userList);
  return res.json({ userList });
});

app.listen(port, () => {
  console.log("Server running on PORT : ", port);
});
