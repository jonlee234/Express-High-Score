const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";
app.use(express.json());
app.use(bodyParser.json());

function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

const vistingScores = [
  { name: "Edwin", score: 50 },
  { name: "David", score: 39 },
];


app.get("/scores", (req, res) => {
  res.send(JSON.stringify(vistingScores));
});
app.post("/scores", function (req, res) {
  let score = req.body;
  vistingScores.push(score);
  res.status(201);
  vistingScores.sort(GetSortOrder("score"));
  vistingScores.length = Math.min(vistingScores.length, 3);

  res.send("success!");
});

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
