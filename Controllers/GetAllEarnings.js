const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
var UserDB = require('../Models/User');
var users = new UserDB();
router.get('/API/GetAllEarnings/:userId',
    function (req, res) {
        users.getStripeAccountId(req.params.userId)
        .then((user)=>{
            stripe.transfers.list({
                limit: 100,
                destination: user.Stripe_Acct_Id,
            })
            .then((result) => {
                //each index represents a monthly total
                //begin with current month - 6 months at index 0
                var total = 0;
                for (var i in result.data) {
                   total += result.data[i].amount;   
                }
                res.json(total)
            })
        })
        .catch((err)=>{
            res.json(err)
        })
    
    })
module.exports = router;
