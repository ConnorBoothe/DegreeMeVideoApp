const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/AttachPaymentMethod', function(req, res){
  users.getUser(req.body.UserId)
  .then((user)=>{
    console.log(user.Stripe_Customer_Id)

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
          ).then(()=>{
            stripe.subscriptions.create({
                customer: user.Stripe_Customer_Id,
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
          })
      })
    })
      .catch((err)=>{
        console.log(err)
          console.log("ERR")
      })
});
module.exports = router;