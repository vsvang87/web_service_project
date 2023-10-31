const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/authRoutes");

const app = new express();
// const ejs = require("ejs");
app.set("view engine", "ejs");

//JSON Web Token
const jwt = require("jsonwebtoken");
//middle ware
app.use(express.static("public"));
app.use(express.json());

//connect to Database
mongoose.connect("mongodb://localhost:27017/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//App listening on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.render("index");
});
app.use(authRoutes);

// //home page
// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.post("/", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, auth) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Posted Created",
//         auth,
//       });
//     }
//   });
//   res.json({
//     message: "Posted created",
//   });
//   console.log("Post Created");
// });
// //signup routes
// app.get("/signup", (req, res) => {
//   res.json(users);
// });
// //POST routes
// const users = []; //Storing users //This will go inside of database
// app.post("/signup", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     const user = {
//       id: Date.now().toString(),
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     };
//     users.push(user);
//     console.log(users);
//     res.redirect("/login.html");
//   } catch (e) {
//     console.log(e);
//     res.status(500).send();
//   }
// });
// //PUT routes
// app.put("/signup", (req, res) => {
//   console.log(req.body);
//   res.json({
//     message: "update successful",
//   });
// });
// //verify token
// function verifyToken(req, res, next) {
//   //Get auth header value
//   const valueHeader = req.headers["authorization"];
//   //check if valueHeader is undefined
//   if (typeof valueHeader !== "undefined") {
//     const bearer = valueHeader.split(" ");
//     //Get token from array
//     const bearerToken = bearer[1];
//     //Set token
//     req.token = bearerToken;
//     //Next
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

// //log in route
// app.get("/login", (req, res) => {
//   res.render("login.html");
//   // url parameters
//   // decoding the tokens
//   //grab the username and password and look up in the database
// });
// app.post("/login", async (req, res, next) => {
//   //Check if there is a user
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username or Password not found" });
//   } else {
//     jwt.sign({}, "secretkey", (err, token) => {
//       res.json({
//         token,
//       });
//       console.log(token);
//     });
//     return res.redirect("/load.html");
//   }
// });
