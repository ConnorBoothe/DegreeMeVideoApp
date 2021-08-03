const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

router.get('/API/GetAllEarnings/:accountId',
    function (req, res) {
        stripe.transfers.list({
            limit: 100,
            destination: req.params.accountId,
        })
            .then((result) => {
                //each index represents a monthly total
                //begin with current month - 6 months at index 0
                var total = 0;
                for (var i in result.data) {
                   total += result.data[i].amount;   
                }
                console.log(total)
                res.json(total)
            })
    });
module.exports = router;
