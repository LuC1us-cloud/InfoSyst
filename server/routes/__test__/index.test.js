const request = require("supertest");
const { response } = require("../../app");
const { app } = require("../../index");

const username = randomstring(10);
const password = randomstring(10);
describe("POST /register", () => {
  it("Try and register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        username,
        password,
        role: Math.random() > 0.5 ? "restaurant" : "client",
      })
      .expect(200);
  });
});
describe("POST /login", () => {
  it("Try and login a user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        username,
        password,
      })
      .expect(200);
  });
});
var randomRestaurantId;
describe("GET /getRestaurants", () => {
  it("Try and get all restaurants", async () => {
    const res = await request(app).get("/getRestaurants").expect(200);
    randomRestaurantId = res.body[0] ? res.body[0]._id : null;
    console.log(randomRestaurantId);
  });
});
describe("GET /getRestaurant", () => {
  it("Try and get a restaurant", async () => {
    const res = await request(app)
      .get(`/getRestaurant/${randomRestaurantId}`)
      .expect(200);
  });
});
describe("POST /editRestaurant", () => {
  it("Try and edit a restaurant", async () => {
    const res = await request(app)
      .post("/editRestaurant")
      .send({
        _id: randomRestaurantId,
        name: "new name",
        surname: "new surname",
        restaurantName: "new restaurant name",
        restaurantCoordinates: "000",
        restaurantAddress: "new address",
        description: "new description",
        profilePicture: "new profile picture",
        phone: "new phone",
        email: "tst@gmail.com",
        website: "new website",
        openingHours: "new openingHours",
        image: "new image",
      })
      .expect(200);
  });
});
describe("POST /toggleRestaurant", () => {
  it("Try and toggle a restaurant", async () => {
    const res = await request(app)
      .post("/toggleRestaurant")
      .send({
        _id: randomRestaurantId,
      })
      .expect(200);
  });
});
describe("GET /profile", () => {
  it("Try and get a profile", async () => {
    const res = await request(app).get(`/profile/${username}`).expect(200);
  });
});
var menuId;
describe("POST /menu", () => {
  it("Try and add a menu", async () => {
    const res = await request(app)
      .post("/menu")
      .send({
        _id: randomRestaurantId,
        name: "new menu name",
        description: "new description",
      })
      .expect(200);
    menuId = res.body._id;
  });
});
describe("POST /item", () => {
  it("Try and add an item", async () => {
    const res = await request(app)
      .post("/item")
      .send({
        _id: randomRestaurantId,
        name: "new item name",
        description: "new description",
        price: 0.15,
        picture: "new picture",
        menuName: "new menu name",
      })
      .expect(200);
  });
});
describe("POST /editItem", () => {
  it("Try and edit an item", async () => {
    const res = await request(app)
      .post("/editItem")
      .send({
        name: "new item name",
        newName: "new item name",
        description: "new description",
        price: 0.15,
        picture: "new picture",
        menuId: menuId,
      })
      .expect(200);
  });
});
describe("DELETE /item", () => {
  it("Try and delete an item", async () => {
    const res = await request(app)
      .delete("/item")
      .send({
        _id: menuId,
        name: "new item name",
      })
      .expect(200);
  });
});
describe("GET /menu", () => {
  it("Try and get a menu", async () => {
    const res = await request(app).get(`/menu/${menuId}`).expect(200);
  });
});
describe("DELETE /menu", () => {
  it("Try and delete a menu", async () => {
    const res = await request(app)
      .delete(`/menu`)
      .send({
        _id: menuId,
      })
      .expect(200);
  });
});
describe("POST /addReview", () => {
  it("Try and add a review", async () => {
    const res = await request(app)
      .post("/addReview")
      .send({
        _id: randomRestaurantId,
        name: "new name",
        review: "The food was okay, pricing could be better",
        rating: 7,
      })
      .expect(200);
  });
});
describe("DELETE /profile", () => {
  it("Try and delete a profile", async () => {
    const res = await request(app).delete(`/profile`).expect(200);
  });
});
describe("GET /orders", () => {
  it("Try and get all orders", async () => {
    const res = await request(app).get(`/orders/${randomRestaurantId}`).expect(200);
  });
});
describe("GET /activeOrders", () => {
  it("Try and get all active orders", async () => {
    const res = await request(app).get(`/activeOrders/${randomRestaurantId}`).expect(200);
  });
});
describe("GET /logout", () => {
  it("Try and logout a user", async () => {
    const res = await request(app).get("/logout").expect(200);
  });
});
function randomstring(length, chars) {
  var chars = chars || "abcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
