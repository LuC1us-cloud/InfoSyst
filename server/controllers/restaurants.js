const db = require("../database/database");
const Validation = require("../controllers/validation");

function getRestaurants(req, res) {
  db.restaurant.find({ approved: true }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).json(data);
    }
  });
}
function getUnapprovedRestaurants(req, res) {
  db.restaurant.find({ approved: false }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).json(data);
    }
  });
}
function editRestaurant(req, res) {
  const restaurant = {
    restaurantName: req.body.restaurantName,
    restaurantAddress: req.body.restaurantAddress,
    restaurantCoordinates: req.body.restaurantCoordinates,
    description: req.body.description,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    website: req.body.website,
    openingHours: req.body.openingHours,
    image: req.body.image,
    phone: req.body.phone,
    profilePicture: req.body.profilePicture,
  };
  if (Validation.validateRestaurant(restaurant)) {
    // find a restaurant by id
    db.restaurant.findOne({ _id: req.body._id }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
      } else {
        if (!data) {
          res.status(404).send("Restaurant not found!");
        } else {
          // update the restaurant
          db.restaurant.update(
            { _id: req.body._id },
            {
              $set: {
                restaurantName: req.body.restaurantName,
                restaurantAddress: req.body.restaurantAddress,
                restaurantCoordinates: req.body.restaurantCoordinates,
                description: req.body.description,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                website: req.body.website,
                openingHours: req.body.openingHours,
                image: req.body.image,
                phone: req.body.phone,
                profilePicture: req.body.profilePicture,
              },
            },
            (err, data) => {
              if (err) {
                console.log(err);
                res.status(500).send("Something went wrong!");
              } else {
                res.status(200).json(data);
              }
            }
          );
        }
      }
    });
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
    menu.restaurantId = req.body._id;
    db.menu.insert(menu, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
      } else {
        console.log("Menu item added");
        // add menu _id to restaurant menu array
        db.restaurant.update(
          { _id: req.body._id },
          { $push: { menu: data._id } },
          (err, numReplaced) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
            } else {
              console.log("Menu added to restaurant");
              res.status(200).json(numReplaced);
            }
          }
        );
      }
    });
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
    db.menu.update(
      { restaurantId: req.body._id },
      { $push: { items: item } },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
        } else {
          console.log("Item added");
          res.status(200).json(data);
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
    name: req.body.newName,
    description: req.body.description,
    price: req.body.price,
    picture: req.body.picture,
  };
  if (Validation.validateItem(item)) {
    db.menu.update(
      { _id: req.body.menuId, "items.name": req.body.name },
      { $set: { "items.$": item } },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
        } else {
          console.log("Item edited");
          res.status(200).json(data);
        }
      }
    );
  } else {
    console.log("Invalid item");
    res.status(400).send("Invalid item");
  }
}
function deleteItem(req, res) {
  db.menu.update(
    { _id: req.body.menuId },
    { $pull: { items: { name: req.body.name } } },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
      } else {
        console.log("Item deleted");
        res.status(200).json(data);
      }
    }
  );
}
function deleteMenu(req, res) {
  // find a menu with the bodu._id and remove it from the restaurant menu array
  // then delete the menu from menu database
  console.log(req.body._id);
  db.menu.findOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      if (!data) {
        console.log("Menu not found");
        res.status(404).send("Menu not found");
      }
      db.restaurant.update(
        { _id: data.restaurantId },
        { $pull: { menu: data._id } },
        (err, numReplaced) => {
          if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
          } else {
            console.log("Menu deleted");
            db.menu.remove({ _id: req.body._id }, (err, numRemoved) => {
              if (err) {
                console.log(err);
                res.status(500).send("Something went wrong!");
              } else {
                console.log("Menu removed");
                res.status(200).json(numRemoved);
              }
            });
          }
        }
      );
    }
  });
}
function getMenu(req, res) {
  db.menu.findOne({ _id: req.params.menuId }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).json(data);
    }
  });
}
function getRestaurant(req, res) {
  db.restaurant.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).json(data);
    }
  });
}
function toggleRestaurant(req, res) {
  db.restaurant.findOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      if (!data) {
        console.log("Invalid restaurant");
        res.status(400).send("Invalid restaurant");
      }
      data.approved = !data.approved;
      db.restaurant.update({ _id: req.body._id }, data, (err, numReplaced) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
        } else {
          if (data.approved) {
            console.log("Restaurant approved");
            res.status(200).json("Restaurant approved");
          } else {
            console.log("Restaurant unapproved");
            res.status(200).json("Restaurant unapproved");
          }
        }
      });
    }
  });
}
function addReview(req, res) {
  const review = {
    name: req.body.name,
    review: req.body.review,
    rating: req.body.rating,
  };
  if (Validation.validateReview(review)) {
    db.restaurant.update(
      { _id: req.body._id },
      { $push: { reviews: review } },
      (err, numReplaced) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
        } else {
          console.log("Review added");
          res.status(200).json(numReplaced);
        }
      }
    );
  } else {
    console.log("Invalid review");
    res.status(400).send("Invalid review");
  }
}
function getReviews(req, res) {
  db.restaurant.findOne({ _id: req.params.restaurantId }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).json(data.reviews);
    }
  });
}

module.exports = {
  getRestaurants,
  getUnapprovedRestaurants,
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
