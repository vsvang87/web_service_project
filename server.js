const express = require("express");
// const ejs = require("ejs");
const app = express();

//json web token
const jwt = require("jsonwebtoken");
//middle ware
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
//home page
app.get("/", (req, res) => {
  res.render("index.html");
});
app.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Posted Created",
        auth,
      });
    }
  });
  res.json({
    message: "Posted created",
  });
  console.log("Post Created");
});
//signup
app.get("/signup", (req, res) => {
  res.render("signup.html");
});
//POST request
app.post("/signup", (req, res) => {
  // const { username, email, password } = req.body;
  // console.log(username, email, password);
  // res.send("new sign up user");
});
//PUT Request
app.put("/signup", (req, res) => {
  console.log(req.body);
  res.json({
    message: "put update successful",
  });
});
//verify token
function verifyToken(req, res, next) {
  //Get auth header value
  const valueHeader = req.headers["authorization"];

  //check if valueHeader is undefined
  if (typeof valueHeader !== "undefined") {
    const bearer = valueHeader.split(" ");
    //Get token from array
    const bearerToken = bearer[1];
    //Set token
    req.token = bearerToken;
    //Next
    next();
  } else {
    res.sendStatus(403);
  }
}
//log in route
app.get("/login", (req, res) => {
  res.render("user_profile.html");
});
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "webmaster00",
    email: "webmaster@test.com",
    password: "testing",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
    console.log(token);
  });

  // const { username, password } = req.body;
  // console.log(username, password);
  // res.send("user login");
});
