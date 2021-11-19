const db = require("../database/database");
const Validation = require("../controllers/validation");

function getRestaurants(req, res) {
  db.restaurant.find({ approved: true }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
}
function addRestaurant(req, res) {
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
    db.restaurant.insert(restaurant, (err, newDoc) => {
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
}

module.exports = {
  getRestaurants,
  addRestaurant,
};
