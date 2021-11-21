const db = require("../database/database");

function orderFood(req, res) {
  const newOrder = {
    client_id: req.body.client_id,
    restaurant_id: req.body.restaurant_id,
    order_status: "pending",
    order_time: new Date(),
    order_delivery_time: new Date(),
    price: req.body.price,
    tip: req.body.tip,
    order_items: req.body.order_items,
    order_address: req.body.order_address,
    order_phone: req.body.order_phone,
    order_notes: req.body.order_notes,
  };
  db.orderLog.insert(newOrder, (err, doc) => {
    if (err) {
      res.status(500).send("Something went wrong!");
    } else {
      res.status(200).send(doc);
    }
  });
}
function getOrders(req, res) {
  // set id to req.body.restaurant_id, if it is null, then set it to req.body.client_id
  const id = req.params.id;
  // return all orders that id matches restaurant_id or client_id 
  db.orderLog.find(
    { $or: [{ restaurant_id: id }, { client_id: id }] },
    (err, doc) => {
      if (err) {
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send(doc);
      }
    }
  );
}
function getActiveOrders(req, res) {
  // set id to req.body.restaurant_id, if it is null, then set it to req.body.client_id
  const id = req.params.id;
  // return all orders that id matches restaurant_id or client_id
  // and order_status is pending or in progress
  db.orderLog.find(
    {
      $or: [{ restaurant_id: id }, { client_id: id }],
      order_status: { $in: ["pending", "approved"] },
    },
    (err, doc) => {
      if (err) {
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send(doc);
      }
    }
  );
}
function acceptOrder(req, res) {
  const id = req.body.id;
  db.orderLog.update(
    { _id: id },
    { $set: { order_status: "approved" } },
    (err, doc) => {
      if (err) {
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send(doc);
      }
    }
  );
}
function rejectOrder(req, res) {
  const id = req.body.id;
  db.orderLog.update(
    { _id: id },
    { $set: { order_status: "rejected" } },
    (err, doc) => {
      if (err) {
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send(doc);
      }
    }
  );
}

module.exports = {
  orderFood,
  getOrders,
  getActiveOrders,
  acceptOrder,
  rejectOrder,
};
