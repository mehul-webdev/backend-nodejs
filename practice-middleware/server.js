const express = require("express");

const app = express();
const port = 3000;

const timeStampMiddleware = (req, res, next) => {
  const method = req.method;
  const timeStamp = new Date().toISOString();
  req.myTimeStamp = timeStamp;
  console.log(`${timeStamp} - ${method} request received`);
  next();
};

app.use(timeStampMiddleware);

app.get("/", (req, res) => {
  const timeStamp = req.myTimeStamp;

  res.status(200).json({
    message: "Welcome to the API!",
    timeStamp,
  });
});

app.post("/", (req, res) => {
  const timeStamp = req.myTimeStamp;
  res.status(200).json({
    message: "Welcome to the API!",
    timeStamp,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
