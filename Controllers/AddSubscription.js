//add subscription if credit card is already added to account
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/AddSubscription', function (req, res) {
    users.getCustomerId(req.body.UserId)
        .then((user) => {
            stripe.subscriptions.create({
                customer: user.Stripe_Customer_Id,
                items: [
                    { price: 'price_1J8uQ2EKHHXXF01HWqZv0vOv' },
                ],
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
        .catch((err)=>{
            res.json(err)
        })
});
module.exports = router;