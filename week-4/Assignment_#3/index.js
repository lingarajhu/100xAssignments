const express = require("express");
const app = express();
const path = require("path");

const hp = [
  {
    user: "jim",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<b>Hi there respones from asd endpoint</b>");
});

app.get("/jim", (req, res) => {
  const jimKidinyes = hp[0].kidneys;
  const noOfKidinyes = jimKidinyes.length;
  const noOfHealthyKidinyes = jimKidinyes.filter(
    (kidneys) => kidneys.healthy
  ).length;
  const noOfUnHealthyKidinyes = noOfKidinyes - noOfHealthyKidinyes;

  res.json({
    noOfKidinyes,
    noOfHealthyKidinyes,
    noOfUnHealthyKidinyes,
  });
});

app.post("/jim", (req, res) => {
  const isHealthy = req.body.isHealthy;
  hp[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done",
  });
});

app.put("/jim", (req, res) => {
  hp[0].kidneys.forEach((kidney) => {
    kidney.healthy = true;
  });
  res.json({
    msg: "done",
  });
});

app.delete("/jim", (req, res) => {
  if (checkForBadKidney()) {
    const goodKidneys = [];
    hp[0].kidneys.forEach((kidney) => {
      if (kidney.healthy) {
        goodKidneys.push({
          healthy: true,
        });
      }
    });
    hp[0].kidneys = goodKidneys;
    res.json({
      msg: "done",
    });
  } else {
    res.status(411).json({
      msg: "you have no bad kidney",
    });
  }
});

const checkForBadKidney = () => {
  let isBadKidney = false;
  hp[0].kidneys.forEach((kidney) => {
    if (!kidney.healthy) {
      isBadKidney = true;
    }
  });
  return isBadKidney;
};

app.listen(3000);
