//add subscription if credit card is already added to account
require('dotenv').config();
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
//add pro subscription
//done
router.post('/API/AddSubscription',
    check('UserId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.getCustomerId(req.body.UserId)
                .then((user) => {
                    console.log(process.env.STRIPE_PRO_ACCESS_PRICE)
                    console.log(process.env)
                    stripe.subscriptions.create({
                        customer: user.Stripe_Customer_Id,
                        items: [
                            { price: process.env.STRIPE_PRO_ACCESS_PRICE },
                        ],
                        // coupon: 'YmOr6RLs',
                    })
                        .then((sub) => {
                            users.updateSubscriptionLevel(user._id, "Pro Tier")
                                .then((result) => {
                                    res.json(result)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            console.log("ERR")
                        })
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    });
module.exports = router;