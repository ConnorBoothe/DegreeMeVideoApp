const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
  check,
  validationResult
} = require('express-validator');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
  resave: false,
  saveUninitialized: true
}));
var UserDB = require('../Models/User');
var users = new UserDB();


router.post('/API/AttachPaymentMethod',
  check('UserId').isString().escape(),
  check('PaymentMethodId').isString().escape(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      users.getUser(req.body.UserId)
        .then((user) => {
          console.log(user.Stripe_Customer_Id)

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
              ).then(() => {
                stripe.subscriptions.create({
                  customer: user.Stripe_Customer_Id,
                  items: [
                    { price: 'price_1J8uQ2EKHHXXF01HWqZv0vOv' },
                  ],
                })
                  .then((sub) => {
                    users.updateSubscriptionLevel(req.body.UserId, "Pro Tier")
                      .then((result) => {
                        res.json(result)

                      })
                  })
              })
            })
        })
        .catch((err) => {
          console.log(err)
          console.log("ERR")
        })
    }
  });
module.exports = router;