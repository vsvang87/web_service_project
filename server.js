const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken"); //JSON Web Token
//middle ware
app.use(express.static("public"));
app.use(express.json());
// app.set("view engine", "ejs");
//App listening on port 3000
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
//signup routes
app.get("/signup", (req, res) => {
  res.json(users);
});
//POST routes
const users = []; //Storing users //This will go inside of database
app.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);
    console.log(users);
    res.redirect("/login.html");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
//PUT routes
app.put("/signup", (req, res) => {
  console.log(req.body);
  res.json({
    message: "update successful",
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
  res.render("login.html");
});
app.post("/login", async (req, res, next) => {
  // const user = {
  //   id: 1,
  //   username: "webmaster00",
  //   email: "webmaster@test.com",
  //   password: "testing",
  // };
  //Check if there is a user
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username or Password not found" });
  } else {
    jwt.sign({ users }, "secretkey", (err, token) => {
      res.json({
        token,
      });
      console.log(token);
    });
    return res.redirect("/load.html");
  }
});

//Log Out Route
app.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});
