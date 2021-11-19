const app = require("./app");
const port = 3000;
const users = require("./controllers/users");
const restaurant = require("./controllers/restaurants");
const orders = require("../controllers/orders");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// get request that returns "Hello world!"
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// login request
app.post("/login", users.login);
// logout request
app.get("/logout", users.logout);
// register post request
app.post("/register", users.register);

// get all restaurants from dbRestaurant, where approved = true
app.get("/restaurants", restaurant.getRestaurants);
// check if restaurant is a valid restaurant to be added to the database, if true, then add it to the database
app.post("/addRestaurant", restaurant.addRestaurant);
