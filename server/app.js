const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    type: ["application/json"],
    limit: "1mb",
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cookieParser());

module.exports = app;
