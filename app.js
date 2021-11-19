const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
    type: ["application/json"],
    limit: "1mb",
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

module.exports = app;