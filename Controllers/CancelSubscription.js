const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const UserDB = require("../Models/User");
const users = new UserDB();
router.post('/API/CancelSubscription', function(req, res){
    stripe.subscriptions.del(req.body.subscription)
      .then((result)=>{
          console.log("Deleted sub: " , result)
        users.updateSubscriptionLevel(req.body.UserId, "Free Tier")
        .then((user)=>{
            res.json(user)
        })
      })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;