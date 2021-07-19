//add subscription if credit card is already added to account
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/AddSubscription', function (req, res) {
    stripe.subscriptions.create({
        customer: req.body.CustomerId,
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
        .catch((err) => {
            console.log(err)
            console.log("ERR")
        })
});
module.exports = router;