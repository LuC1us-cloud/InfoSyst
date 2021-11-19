const express = require("express");
var session = require('express-session')
const Validation = require("./validation");
const app = require("./app");

const Datastore = require("nedb");
const dbRestaurant = new Datastore({
  filename: "database/Restaurant.db",
  autoload: true,
});
const dbMenu = new Datastore({
  filename: "database/Menu.db",
  autoload: true,
});
const dbItem = new Datastore({
  filename: "database/Item.db",
  autoload: true,
});
const dbMonthlyData = new Datastore({
  filename: "database/MonthlyData.db",
  autoload: true,
});
const dbClient = new Datastore({
  filename: "database/Client.db",
  autoload: true,
});
const dbAdmin = new Datastore({
  filename: "database/Admin.db",
  autoload: true,
});
const dbLogin = new Datastore({
  filename: "database/Login.db",
  autoload: true,
});
const dbOrderLog = new Datastore({
  filename: "database/OrderLog.db",
  autoload: true,
});
const dbCommandLog = new Datastore({
  filename: "database/CommandLog.db",
  autoload: true,
});
const dbPaymentInfo = new Datastore({
  filename: "database/PaymentInfo.db",
  autoload: true,
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
function isLoggedIn(req, res, next) {
  if (req.session.username) {
    return next();
  }
  res.redirect("/login");
}
// a function that checks the user's role matches at least one of the roles that are sent throught function parameters
function isAuthorized(...roles) {
  return (req, res, next) => {
    if (roles.includes(req.session.role)) {
      return next();
    }
    res.redirect("/login");
  };
}

// login request
app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  dbLogin.findOne({ username: username, password: password }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data == null) {
        res.send("false");
      } else {
        // set session variable to role and username
        req.session.role = data.role;
        req.session.username = data.username;
        res.send("true");
      }
    }
  });
});
// logout request
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("true");
});
// register post request
app.post("/register", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;
  dbLogin.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data == null) {
        const newUser = {
          username: username,
          password: password,
          role: role,
          isBanned: false,
        };
        dbLogin.insert(newUser, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            if (role == "client") {
          const newClient = {
            name: "",
            surname: "",
            adress: "",
            profilePicture: "",
            _id: data._id,
          }
              dbClient.insert(newClient, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("true");
                }
              });
            } else if (role == "restaurant") {
          const newRestaurant = {
            name: "",
            surname: "",
            adress: "",
            profilePicture: "",
            restaurantName: "",
            restaurantCoordinates: "",
            approved: false,
            _id: data._id,
          }
              dbRestaurant.insert(newRestaurant, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("true");
                }
              });
            }
          }
        });
      } else {
        res.send("false");
      }
    }
  });
});
// get all restaurants from dbRestaurant, where approved = true
app.get("/restaurants", (req, res) => {
  dbRestaurant.find({ approved: true }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
// check if restaurant is a valid restaurant to be added to the database, if true, then add it to the database
app.post("/addRestaurant", (req, res) => {
  const restaurant = {
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    restaurantCoordinates: req.body.restaurantCoordinates,
    restaurantRating: req.body.restaurantRating,
    description: req.body.description,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    profilePicture: req.body.profilePicture,
  };
  if (Validation.validateRestaurant(restaurant)) {
    restaurant.approved = false;
    restaurant.menu = [];
    restaurant.orderLog = [];
    restaurant.paymentInfo = [];
    restaurant.monthlyData = [];
    restaurant.reviews = [];
    dbRestaurant.insert(restaurant, (err, newDoc) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New restaurant added");
        res.json(newDoc);
      }
    });
  } else {
    console.log("Invalid restaurant");
    res.status(400).send("Invalid restaurant");
  }
});
// get request that returns "Hello world!"
app.get("/", (req, res) => {
  res.send({ message: 'Hello World!' });
}
);