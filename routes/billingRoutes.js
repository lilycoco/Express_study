const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exoirts = app => {
  app.post("/api/stripe", (req, res) => {});
};
