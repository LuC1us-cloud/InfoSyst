const express = require("express");
const app = express();
const port = 3000;
const Validation = require("./validation");

const Datastore = require("nedb");
// database called dbRestaurant, dbMenu, dbItem, dbMonthlyData, dbClient, dbAdmin, dbLogin, dbOrderLog, dbCommandLog, dbPaymentInfo
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

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  // query db for all data and respond with json
  dbRestaurant.find({}, (err, data) => {
    res.json(data);
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
