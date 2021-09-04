const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();

var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetUpcomingPayments/:userId', function (req, res) {
  users.getCustomerId(req.params.userId)
    .then((user) => {
      if(user !== null) {

    
      stripe.invoices.retrieveUpcoming({
        customer: user.Stripe_Customer_Id,
      })
        .then((result) => {
          res.json(result.lines.data)
        })
      }
      else {
        res.json("err")
      }
    })
    .catch((err) => {
      console.log("No invoices")
      res.json("err")
    })
});
module.exports = router;