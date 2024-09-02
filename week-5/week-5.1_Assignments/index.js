const express = require("express");
const app = express();

// ! Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const consoleMiddleware = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`${timeStamp}, ${req.method},${req.url}`);
  next();
};

app.get("/console", consoleMiddleware, (req, res) => {
  res.status(200).json({
    msg: "check the console",
  });
});

function middleware(req, res, next) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({
      msg: "Invalid inputs",
    });
  } else {
    req.a = a;
    req.b = b;
    next();
  }
}

app.get("/sub", middleware, (req, res) => {
  const ans = req.a - req.b;
  res.status(200).json({
    ans,
  });
});

app.listen(3005, () => console.log("server is running at 3005"));
