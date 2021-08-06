const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();


router.get('/API/GetStripeCustomer/:customer_id', function(req, res){
        stripe.customers.retrieve(
            req.params.customer_id
        )
      .then((result)=>{
        res.json(result)
      })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;