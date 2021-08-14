const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();

var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetStripeCustomer/:userId', function (req, res) {
  console.log(req.params.userId)
  users.getCustomerId(req.params.userId)
    .then((user) => {
      console.log(user)
      stripe.customers.retrieve(
        user.Stripe_Customer_Id
      )
        .then((result) => {
          console.log(result)
          res.json(result)
        })
    })
    .catch((err) => {
      console.log("Error occured")
      res.json("err")
    })

});
module.exports = router;