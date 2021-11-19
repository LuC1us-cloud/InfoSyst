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
function editRestaurant(req, res) {
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
    db.restaurant.update(
      { _id: req.body.id },
      restaurant,
      (err, numReplaced) => {
        if (err) {
          console.log(err);
        }
        console.log("Restaurant edited");
        res.json(numReplaced);
      }
    );
  } else {
    console.log("Invalid restaurant");
    res.status(400).send("Invalid restaurant");
  }
}
function addMenu(req, res) {
  const menu = {
    name: req.body.name,
    description: req.body.description,
  };
  if (Validation.validateMenu(menu)) {
    menu.items = [];
    db.restaurant.update(
      { _id: req.body.id },
      { $push: { menu: menu } },
      (err, numReplaced) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Menu item added");
          res.json(numReplaced);
        }
      }
    );
  } else {
    console.log("Invalid menu item");
    res.status(400).send("Invalid menu item");
  }
}
function addItem(req, res) {
  const item = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
  };
  if (Validation.validateItem(item)) {
    db.restaurant.update(
      { _id: req.body.id, "menu._id": req.body.menuId },
      { $push: { "menu.$.items": item } },
      (err, numReplaced) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Item added");
          res.json(numReplaced);
        }
      }
    );
  } else {
    console.log("Invalid item");
    res.status(400).send("Invalid item");
  }
}
function editItem(req, res) {
  const item = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
  };
  if (Validation.validateItem(item)) {
    db.restaurant.update(
      {
        _id: req.body.id,
        "menu._id": req.body.menuId,
        "menu.items._id": req.body.itemId,
      },
      { $set: { "menu.$.items.$": item } },
      (err, numReplaced) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Item edited");
          res.json(numReplaced);
        }
      }
    );
  } else {
    console.log("Invalid item");
    res.status(400).send("Invalid item");
  }
}
function deleteItem(req, res) {
  db.restaurant.update(
    { _id: req.body.id, "menu._id": req.body.menuId },
    { $pull: { "menu.$.items": { _id: req.body.itemId } } },
    (err, numReplaced) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Item deleted");
        res.json(numReplaced);
      }
    }
  );
}
function deleteMenu(req, res) {
  db.restaurant.update(
    { _id: req.body.id },
    { $pull: { menu: { _id: req.body.menuId } } },
    (err, numReplaced) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Menu deleted");
        res.json(numReplaced);
      }
    }
  );
}
function getMenu(req, res) {
  db.restaurant.findOne(
    { _id: req.body.id, "menu._id": req.body.menuId },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
}
function getRestaurant(req, res) {
  db.restaurant.findOne({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
}
function toggleRestaurant(req, res) {
  db.restaurant.update(
    { _id: req.body.id },
    { $set: { approved: req.body.approved } },
    (err, numReplaced) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Restaurant approved");
        res.json(numReplaced);
      }
    }
  );
}
function addReview(req, res) {
  const review = {
    name: req.body.name,
    review: req.body.review,
    rating: req.body.rating,
  };
  if (Validation.validateReview(review)) {
    db.restaurant.update(
      { _id: req.body.id },
      { $push: { reviews: review } },
      (err, numReplaced) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Review added");
          res.json(numReplaced);
        }
      }
    );
  } else {
    console.log("Invalid review");
    res.status(400).send("Invalid review");
  }
}
function getReviews(req, res) {
  db.restaurant.findOne({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data.reviews);
    }
  });
}

module.exports = {
  getRestaurants,
  getRestaurant,
  editRestaurant,
  toggleRestaurant,
  addMenu,
  getMenu,
  deleteMenu,
  addItem,
  editItem,
  deleteItem,
  addReview,
  getReviews,
};
