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
      if (user !== null) {
        stripe.customers.retrieve(
          user.Stripe_Customer_Id
        )
          .then((result) => {
            console.log(result)
            res.json(result)
          })
      }
      else {
        res.json("err")

      }
    })
    .catch((err) => {
      console.log(err)
      console.log("Error ocurred")
      res.json("err")
    })

});
module.exports = router;