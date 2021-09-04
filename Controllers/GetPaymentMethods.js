const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetPaymentMethods/:userId',
  function (req, res) {
    users.getCustomerId(req.params.userId)
      .then((user) => {
        if (user !== null) {


          stripe.paymentMethods.list({
            customer: user.Stripe_Customer_Id,
            type: 'card',
          })
            .then((result) => {
              res.json(result)
            })
        }
        else {
          res.json("err")
        }
      })

      .catch((err) => {
        console.log(err)
        res.json("err")
      })
  });
module.exports = router;