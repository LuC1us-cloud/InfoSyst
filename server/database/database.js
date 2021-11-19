const Datastore = require("nedb");
const dbRestaurant = new Datastore({
  filename: "database/Restaurant.db",
  autoload: true,
});
const dbMonthlyData = new Datastore({
  filename: "database/MonthlyData.db",
  autoload: true,
});
const dbClient = new Datastore({
  filename: "database/Client.db",
  autoload: true,
});
const dbAdmin = new Datastore({
  filename: "database/Admin.db",
  autoload: true,
});
const dbLogin = new Datastore({
  filename: "database/Login.db",
  autoload: true,
});
const dbOrderLog = new Datastore({
  filename: "database/OrderLog.db",
  autoload: true,
});
const dbCommandLog = new Datastore({
  filename: "database/CommandLog.db",
  autoload: true,
});
const dbPaymentInfo = new Datastore({
  filename: "database/PaymentInfo.db",
  autoload: true,
});
// export all consts
module.exports = {
  restaurant: dbRestaurant,
  monthlyData: dbMonthlyData,
  client: dbClient,
  admin: dbAdmin,
  login: dbLogin,
  orderLog: dbOrderLog,
  commandlog: dbCommandLog,
  paymentInfo: dbPaymentInfo,
};
