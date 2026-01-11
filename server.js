const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/win12")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const User = require("./models/User");
const Writing = require("./models/Writing");

/* Dummy login (single user for simplicity) */
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    user = await User.create(req.body);
  }

  res.json(user);
});

/* Start writing session */
app.post("/write", async (req, res) => {
    app.post("/write", async (req, res) => {
  const { userId, content } = req.body;

  // find existing writing for user
  let writing = await Writing.findOne({ userId });

  if (writing) {
    // append new text
    writing.content += "\n" + content;
    writing.time = new Date();
    await writing.save();
  } else {
    // create new writing
    writing = await Writing.create({
      userId,
      content
    });
  }

  res.json(writing);
});
  const writing = await Writing.create({
    userId: req.body.userId,
    content: req.body.content,
    time: new Date()
  });

  res.json(writing);
});
app.get("/history/:userId", async (req, res) => {
  const writings = await Writing
    .find({ userId: req.params.userId })
    .sort({ time: -1 });

  res.json(writings);
});
/* Delete a writing by id */
app.delete("/history/:id", async (req, res) => {
  await Writing.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});





/* SERVER START */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});