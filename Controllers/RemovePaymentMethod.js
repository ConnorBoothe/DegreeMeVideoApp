const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.post('/API/RemovePaymentMethod', function(req, res){
        //make payment method default
        console.log("removing it")
        console.log(req.body)
        stripe.paymentMethods.detach(
            req.body.PaymentMethodId
          ).then((result)=>{ 
              console.log("Remove", result)
              res.json(result) 
      })
      .catch((err)=>{
          console.log(err)
          console.log("ERR")
      })
});
module.exports = router;