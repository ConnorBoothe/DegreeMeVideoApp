const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetSubscriptions/:userId', 
function(req, res){
  users.getCustomerId(req.params.userId)
  .then((user)=>{
   stripe.subscriptions.list({
        limit: 3,
        customer: user.Stripe_Customer_Id
      })
      .then((result)=>{
        res.json(result)
      })
    })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;