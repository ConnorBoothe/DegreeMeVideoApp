const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetSubscriptions/:customer_id', function(req, res){
    console.log("get sub settings")
    console.log(req.params.customer_id)
   stripe.subscriptions.list({
        limit: 3,
        customer: req.params.customer_id
      })
      .then((result)=>{
          console.log(result)
        res.json(result)
      })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;