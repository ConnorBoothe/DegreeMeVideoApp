const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/AddPaymentMethod', 
function(req, res){
    users.getCustomerId(req.body.UserId)
    .then((user)=>{

    stripe.paymentMethods.attach(
        req.body.PaymentMethodId,
        {customer: user.Stripe_Customer_Id}
      )
      .then((result)=>{
        //make payment method default
        stripe.customers.update(
            user.Stripe_Customer_Id,
            {invoice_settings:{
                default_payment_method: req.body.PaymentMethodId
            }
            }
          ).then((result)=>{
                res.json(result)
            })
      })
    })
      .catch(()=>{
          console.log("ERR")
      })
});
module.exports = router;