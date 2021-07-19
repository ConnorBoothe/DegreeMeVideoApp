const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.get('/API/GetPaymentMethods/:customer_id', function(req, res){
    console.log("get payment settings")
    console.log(req.params.customer_id)
    stripe.paymentMethods.list({
        customer: req.params.customer_id,
        type: 'card',
      })
      .then((result)=>{
        res.json(result)
      })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;