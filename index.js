const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
const path = require("path");

const user = JSON.parse(fs.readFileSync("./user.json", "UTF-8"));

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});
/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
  res.send(user);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  const { username, password } = req.query;

  // Convert query parameters to strings for comparison
  const inputUsername = String(username);
  const inputPassword = String(password);

  console.log(inputUsername);
  console.log(inputPassword);
  if (inputUsername === user.username && inputPassword === user.password) {
    res.json({
      status: true,
      message: "User Is valid",
    });
  } else if (inputUsername !== user.username) {
    res.json({
      status: false,
      message: "User Name is invalid",
    });
  } else {
    res.json({
      status: false,
      message: "Password is invalid",
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout", (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use("/", router);

// http://localhost:8081/
app.listen(process.env.port || 3000, () => {
  console.log("Web Server is listening at port " + (process.env.port || 3000));
});
