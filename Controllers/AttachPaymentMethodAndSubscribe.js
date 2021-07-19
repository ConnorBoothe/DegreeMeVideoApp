const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/AttachPaymentMethod', function(req, res){
    console.log("attaching..")
    console.log(req.body)
    stripe.paymentMethods.attach(
        req.body.PaymentMethodId,
        {customer: req.body.CustomerId}
      )
      .then((result)=>{
        console.log(result)
        console.log(req.body.CustomerId,
          req.body.PaymentMethodId)
        //make payment method default
        stripe.customers.update(
            req.body.CustomerId,
            {invoice_settings:{
                default_payment_method: req.body.PaymentMethodId
            }
            }
          ).then(()=>{
            stripe.subscriptions.create({
                customer: req.body.CustomerId,
                items: [
                  {price: 'price_1J8uQ2EKHHXXF01HWqZv0vOv'},
                ],
              })
              .then((sub)=>{
                users.updateSubscriptionLevel(req.body.UserId, "Pro Tier")
                .then((result)=>{
                    res.json(result)
                  
                })
              })
              console.log("updated")
          })
      })
      .catch((err)=>{
        console.log(err)
          console.log("ERR")
      })
});
module.exports = router;