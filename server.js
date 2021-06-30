const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./src/model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userApi = require("./src/api/user.api");
const researchApi = require("./src/api/research.api");
const myadmin = require("./src/routes/myadmin.route");

const conferenceDetail = require('./src/routes/ConferenceDetail.route');

const staffDetail = require('./src/routes/Staff.route');
const speakerDetail = require('./src/routes/speaker.route');

const workshopApi = require("./src/api/workshop.api");

const multer = require("multer");


const JWT_SECRET =
  "jshdyufu897e$hhv#HvJH$@HV#$HV%#HV$@CG$C@$$G#!vjhiviywe&YGGUDW#@#@#Hvjwfvwlvfwfgwgf";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8087;

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(
  MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Database error");
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.route("/").get((req, res) => {
  res.send("Conference API Working");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid Username/ password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  const { username, password: plainTextPassword, email, type } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const res = await User.create({
      username,
      password,
      email,
      type,
    });

    console.log("User Created successfully :", res);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error" });
  }

  res.json({ status: "ok" });
});

app.use("/api/user", userApi());
app.use("/api/research", researchApi());
app.use("/myadmin", myadmin);

app.use('/conferenceDetails', conferenceDetail);
app.use('/staffDetails',staffDetail);
app.use('/speakerDetail',speakerDetail);


app.use("/api/workshop", workshopApi());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
