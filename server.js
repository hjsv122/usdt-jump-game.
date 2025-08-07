const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

let userProfits = {};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/add-profit", (req, res) => {
  const { wallet, amount } = req.body;
  if (!wallet || !amount) return res.status(400).send("بيانات ناقصة");
  if (!userProfits[wallet]) userProfits[wallet] = 0;
  userProfits[wallet] += amount;
  res.send({ message: "تمت الإضافة", total: userProfits[wallet] });
});

app.get("/profit/:wallet", (req, res) => {
  const wallet = req.params.wallet;
  const profit = userProfits[wallet] || 0;
  res.send({ profit });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
