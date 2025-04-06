const express = require("express");

const app = express();
const path = require("path");
const port = 3000;
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/about", (req, res) => {
  res.json({
    name: "John Doe",
    age: 30,
    occupation: "Software Developer",
  });
});

app.get("/projects", (req, res) => {
  res.json(["project1", "project2", "project3"]);
});

let userInfo = [
  {
    username: "Mehul Chaudhary",
    email: "mehul@gmail.com",
  },
];

app.get("/users", (req, res) => {
  res.status(200).json(userInfo);
});

app.post("/addNewUser", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).json({
      message: "Please provide username and email",
    });
    return;
  }

  const user = userInfo.find(
    (user) => user.username === username && user.email === email
  );

  if (user) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  userInfo.push({ username, email });

  res.status(200).json({
    message: "user created",
    users: userInfo,
  });
});

app.patch("/updateUserInfo", (req, res) => {
  const { username, email } = req?.body;

  if (!username || !email) {
    res.status(400).json({
      message: "Please provide username and email",
    });
    return;
  }

  const userIndex = userInfo.findIndex(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (userIndex !== -1) {
    userInfo[userIndex].email = email;
    res.status(200).json({
      message: "User updated",
      users: userInfo,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.delete("/deleteUser", (req, res) => {
  const { username } = req?.body;

  if (!username) {
    res.status(400).json({
      message: "Please provide username",
    });
    return;
  }

  const userIndex = userInfo.findIndex(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (userIndex !== -1) {
    userInfo.splice(userIndex, 1);
    res.status(200).json({
      message: "User deleted",
      users: userInfo,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
