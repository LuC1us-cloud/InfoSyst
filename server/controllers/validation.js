const Joi = require("joi");
function validateMenu(menu) {
  // menu description should be at least 1 characters long, but not longer than 500
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(1).max(500).required(),
  });
  const { error, value } = schema.validate(menu);
  if (error) {
    return false;
  } else {
    return true;
  }
}
function validateItem(item) {
  // item description should be at least 1 characters long, but not longer than 500
  const schema = Joi.object({
    name: Joi.string().min(1).max(60).required(),
    description: Joi.string().min(1).max(500).required(),
    price: Joi.number().required(),
    picture: Joi.string().min(1).max(500).required(),
  });
  const { error, value } = schema.validate(item);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
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
    description: Joi.string().min(1).max(500).required(),
    name: Joi.string().min(1).max(30).required(),
    surname: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    image: Joi.string().min(1).max(500).required(),
    website: Joi.string().min(1).max(500).required(),
    openingHours: Joi.string().min(1).max(50).required(),
    phone: Joi.string().min(1).max(15).required(),
    profilePicture: Joi.string().min(1).max(500).required(),
  });
  const { error, value } = schema.validate(restaurant);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
function validateReview(review) {
  // review name should be at least 1 characters long, but not longer than 30
  // review description should be at least 1 characters long, but not longer than 500
  // review rating should be a number between 1 and 10 float
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    review: Joi.string().min(1).max(500).required(),
    rating: Joi.number().min(1).max(10).required(),
  });
  const { error, value } = schema.validate(review);
  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}
function validateOrder(order) {
  // const schema = Joi.object({
  //   // client id should be a string of size 16
  //   client_id: Joi.string().length(16).required(),
  //   restaurant_id: Joi.string().length(16).required(),
  //   order_status: Joi.string().valid("pending", "accepted", "rejected").required(),
  //   // order_time: Joi.string().required(),
  //   // order_delivery_time: Joi.string().required(),
  //   order_total_price: Joi.number().required(),
  //   tip: Joi.number().required(),
  //   // order_items: Joi.array().items(Joi.object({
  //   //   name: Joi.string().min(1).max(60).required(),
  //   //   description: Joi.string().min(1).max(500).required(),
  //   //   price: Joi.number().required(),
  //   //   picture: Joi.string().min(1).max(500).required(),
  //   //   quantity: Joi.number().required(),
  //   // })).required(),
  //   order_address: Joi.string().required(),
  //   order_phone: Joi.string().required(),
  //   // order_notes: Joi.string().required(),
  // });
  // const { error, value } = schema.validate(order);
  // if (error) {
  //   console.log(error);
  //   return false;
  // } else {
  //   return true;
  // }

  return true;
}
// exports all functions
module.exports = {
  validateRestaurant,
  validateMenu,
  validateItem,
  validateReview,
  validateOrder,
};
