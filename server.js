const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = new express();

//public folder
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/", (req, res) => {
  res.render("index.html");
});
app.get("/about", (req, res) => {
  res.render("about.html");
});
