const express = require("express");
const app = express();

// ! Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

let numberOfRequests = 0;

app.use((req, res, next) => {
  numberOfRequests += 1;
  next();
});

app.get("/ride1", (req, res) => {
  res.status(200).json({
    msg: `number of requests sent is ${numberOfRequests}`,
  });
});

app.get("/ride2", (req, res) => {
  res.status(200).json({
    msg: `number of requests sent is ${numberOfRequests}`,
  });
});

app.listen(3004);
