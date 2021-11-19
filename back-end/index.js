const app = require("./app");
const port = 3000;
const users = require("./controllers/users");
const restaurant = require("./controllers/restaurants");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
exports.app = app;
// get request that returns "Hello world!"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front-end/index.html");
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
