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
const workshopApi = require("./src/api/workshop.api");
const path = require("path");
const multer = require("multer");

const JWT_SECRET =
  "jshdyufu897e$hhv#HvJH$@HV#$HV%#HV$@CG$C@$$G#!vjhiviywe&YGGUDW#@#@#Hvjwfvwlvfwfgwgf";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/files", express.static(path.join(__dirname, "/files")));

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

app.use("/api/user", userApi());
app.use("/api/research", researchApi());
app.use("/api/workshop", workshopApi());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
