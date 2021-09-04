const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true,
  resave: false,
  saveUninitialized: true
}));
const {
  check,
  validationResult
} = require('express-validator');
var UserDB = require('../Models/User');
var users = new UserDB();
//done
//add payment method to user account
router.post('/API/AddPaymentMethod',
  check('UserId').isString().escape(),
  check('PaymentMethodId').isString().escape(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      users.getCustomerId(req.body.UserId)
        .then((user) => {
          stripe.paymentMethods.attach(
            req.body.PaymentMethodId,
            { customer: user.Stripe_Customer_Id }
          )
            .then((result) => {
              //make payment method default
              stripe.customers.update(
                user.Stripe_Customer_Id,
                {
                  invoice_settings: {
                    default_payment_method: req.body.PaymentMethodId
                  }
                }
              ).then((result) => {
                res.json(result)
              })
            })
        })
        .catch((err) => {
          console.log("ERR")
          res.json(err)
        })
    }
  });
module.exports = router;