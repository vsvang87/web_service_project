const express = require("express");
const ejs = require("ejs");
const app = express();

//middle ware
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

//json web token
// const jwt = require("jsonwebtoken");

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
//home page
app.get("/", (req, res) => {
  res.render("index.html");
});
//signup
app.get("/signup", (req, res) => {
  res.render("signup.html");
});
app.post("/signup", (req, res) => {
  res.send("new sign up user");
});
//log in route
app.get("/login", (req, res) => {
  res.render("user_profile.html");
});
app.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  res.send("user login");
});
