const db = require("../database/database");

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.login.findOne({ username: username, password: password }, (err, data) => {
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
}
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
function logout(req, res) {
  req.session.destroy();
  res.send("true");
}
function register(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;
  db.login.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      if (data == null) {
        const newUser = {
          username: username,
          password: password,
          role: role,
          isBanned: false,
        };
        db.login.insert(newUser, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
          } else {
            if (role == "client") {
              const newClient = {
                name: "",
                surname: "",
                adress: "",
                profilePicture: "",
                _id: data._id,
              };
              db.client.insert(newClient, (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Something went wrong!");
                } else {
                  res.status(200).send("Registration successful!");
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
              };
              db.restaurant.insert(newRestaurant, (err, data) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Something went wrong!");
                } else {
                  res.status(200).send("Registration successful!");
                }
              });
            }
          }
        });
      } else {
        res.status(500).send("Something went wrong!");
      }
    }
  });
}
function getProfile(req, res) {
  var username = req.session.username;
  db.login.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      if (data == null) {
        res.status(500).send("Something went wrong!");
      } else {
        if (data.role == "client") {
          db.client.findOne({ _id: data._id }, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
            } else {
              if (data == null) {
                res.status(500).send("Something went wrong!");
              } else {
                res.status(200).send(data);
              }
            }
          });
        } else if (data.role == "restaurant") {
          db.restaurant.findOne({ _id: data._id }, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
            } else {
              if (data == null) {
                res.status(500).send("Something went wrong!");
              } else {
                res.status(200).send(data);
              }
            }
          });
        }
      }
    }
  });
}
function deleteProfile(req, res) {
  var username = req.session.username;
  db.login.findOne({ username: username }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      if (data == null) {
        res.status(500).send("Something went wrong!");
      } else {
        if (data.role == "client") {
          db.client.remove({ _id: data._id }, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
            } else {
              if (data == null) {
                res.status(500).send("Something went wrong!");
              } else {
                db.login.remove({ _id: data._id }, (err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Something went wrong!");
                  } else {
                    if (data == null) {
                      res.status(500).send("Something went wrong!");
                    } else {
                      res.status(200).send("Profile deleted!");
                    }
                  }
                });
              }
            }
          });
        } else if (data.role == "restaurant") {
          db.restaurant.remove({ _id: data._id }, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong!");
            } else {
              if (data == null) {
                res.status(500).send("Something went wrong!");
              } else {
                db.login.remove({ _id: data._id }, (err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Something went wrong!");
                  } else {
                    if (data == null) {
                      res.status(500).send("Something went wrong!");
                    } else {
                      res.status(200).send("Profile deleted!");
                    }
                  }
                });
              }
            }
          });
        }
      }
    }
  });
}

module.exports = {
  login: login,
  register: register,
  logout: logout,
  getProfile,
  deleteProfile,
};
