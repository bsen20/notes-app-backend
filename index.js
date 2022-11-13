const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/notes", (req, res) => {
  res.send("Hello from notes page");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server is running");
});
