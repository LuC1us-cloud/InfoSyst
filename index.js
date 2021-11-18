const express = require("express");
const Joi = require("joi");
const app = express();
const port = 3000;
// import neDB from "nedb";
const Datastore = require("nedb");
const db = new Datastore({ filename: "data.db", autoload: true });
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  // query db for all data and respond with json
  db.find({}, (err, data) => {
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
  if (validateRestaurant(restaurant)) {
    restaurant.approved = false;
    db.insert(restaurant, (err, newDoc) => {
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

function validateRestaurant(restaurant) {
  // restaurant name should be at least 3 characters long, but not longer than 30
  // restaurant address should be at least 3 characters long, but not longer than 40
  // restaurant coordinates should be at least 3 characters long, but not longer than 40
  // restaurant rating should be at least 1 characters long, but not longer than 3
  // description should be at least 1 characters long, but not longer than 500
  // name should be at least 1 characters long, but not longer than 30
  // surname should be at least 1 characters long, but not longer than 30
  // email should be validated with validateEmail(Email)
  // phone should be at least 1 characters long, but not longer than 15
  // profilePicture should be at least 1 characters long, but not longer than 500
  const schema = Joi.object({
    restaurantName: Joi.string().min(3).max(30).required(),
    restaurantAddress: Joi.string().min(3).max(40).required(),
    restaurantCoordinates: Joi.string().min(3).max(40).required(),
    restaurantRating: Joi.string().min(1).max(3).required(),
    description: Joi.string().min(1).max(500).required(),
    name: Joi.string().min(1).max(30).required(),
    surname: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(1).max(15).required(),
    profilePicture: Joi.string().min(1).max(500).required(),
  });
  const { error, value } = schema.validate(restaurant);
  if (error) {
    return false;
  } else {
    return true;
  }
}
