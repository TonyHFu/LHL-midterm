// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

//Twilio
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
module.exports = { client };
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.KEY1
  ],
  maxAge: 24 * 60 * 60 * 1000
}));




app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const itemOrdersRoutes = require("./routes/item_orders");
const notificationRoutes = require("./routes/edit_order");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/login", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/item_orders", itemOrdersRoutes(db));
app.use("/api/notify", notificationRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/order", (req, res) => {
  res.render("order_page");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
