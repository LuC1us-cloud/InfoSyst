const request = require("supertest");
const { app } = require("../../index");

// sets the requests timeouts at 10s
jest.setTimeout(10000);
describe("POST /register", () => {
  it("Try and register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        username: randomstring(10),
        password: randomstring(10),
        role: Math.random() > 0.5 ? "restaurant" : "client",
      })
      .expect(200);
  });
});
function randomstring(length, chars) {
  var chars = chars || "abcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
