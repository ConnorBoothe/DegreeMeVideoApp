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
const UserDB = require("../Models/User");
const users = new UserDB();
router.post('/API/CancelSubscription',
  check('subscription').isString().escape(),
  check('UserId').isString().escape(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      stripe.subscriptions.del(req.body.subscription)
        .then((result) => {
          users.updateSubscriptionLevel(req.body.UserId, "Free Tier")
            .then((user) => {
              res.json(user)
            })
        })
        .catch((err) => {
          console.log(err)
          res.json("err")
        })
    }
  });
module.exports = router;