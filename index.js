const express = require("express");
const app = express();
const port = 3000;
// import neDB from "nedb";
const Datastore = require("nedb");
const db = new Datastore({ filename: "data.db", autoload: true });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  // query db for all data and respond with json
  db.find({}, (err, data) => {
    res.json(data);
  });
});

app.post("/addData", (req, res) => {
  const newData = {
    Name: "Name" + Math.floor(Math.random() * 100),
    Age: Math.floor(Math.random() * 100),
    Color: "Color" + Math.floor(Math.random() * 100),
  };
  db.insert(newData, (err, data) => {
    res.json(data);
  });
});
