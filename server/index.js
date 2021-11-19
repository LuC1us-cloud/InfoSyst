const app = require("./app");
const port = 3000;
const users = require("./controllers/users");
const restaurant = require("./controllers/restaurants");
const order = require("./controllers/orders");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
exports.app = app;
// get request that returns "Hello world!"
app.get("/", (req, res) => {
  // absolute path string D:\Xamp\htdocs\InfoSyst\front-end\html\index.html
  res.sendFile(__dirname + "/front-end/html/index.html");
});

// login request
app.post("/login", users.login);
// logout request
app.get("/logout", users.logout);
// register post request
app.post("/register", users.register);

// gets list of restaurants
app.get("/getRestaurants", restaurant.getRestaurants);
// gets restaurant information
app.get("/getRestaurant", restaurant.getRestaurant);
// edots a restaurant's information
app.post("/editRestaurant", restaurant.editRestaurant);
// toggles a restaurant from being viewed
app.post("/toggleRestaurant", restaurant.toggleRestaurant);

// gets profile information
app.get("/getProfile", users.getProfile);
// deletes the user profile and all related data
app.post("/deleteProfile", users.deleteProfile);

// adds a menu item to a restaurant
app.post("/addMenu", restaurant.addMenu);
// gets the menu for a restaurant
app.get("/getMenu", restaurant.getMenu);
// deletes a menu item
app.post("/deleteMenu", restaurant.deleteMenu);

// adds an item to a menu
app.post("/addItem", restaurant.addItem);
// edits an item in the menu
app.post("/editItem", restaurant.editItem);
// deletes an item in the menu
app.post("/deleteItem", restaurant.deleteItem);

// adds a review to a restaurant
app.post("/addReview", restaurant.addReview);
// gets the reviews for a restaurant
app.get("/getReviews", restaurant.getReviews);

// get the current order
app.get("/getActiveOrders", order.getActiveOrders);
// gets the order log for a user or a restaurant
app.get("/getOrders", order.getOrders);
// generates a live order tracker and an order log in the database
app.post("/orderFood", order.orderFood);
