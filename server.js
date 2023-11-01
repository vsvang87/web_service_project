const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = new express();
const uri = "mongodb://localhost:27017/my_database";

app.set("view engine", "ejs");

//JSON Web Token
const jwt = require("jsonwebtoken");
//middle ware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//connect to Database
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error);
  }
}
connect();

//App listening on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.render("index");
});
app.use(authRoutes);

//cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("newEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("Cookies successful!");
});
//read cookies
app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});
