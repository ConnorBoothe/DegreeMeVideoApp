const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const express = require('express');
const router = express.Router();


router.get('/API/GetUpcomingPayments/:customer_id', function(req, res){
    console.log("get upcoming pay")
    console.log(req.params.customer_id)
    stripe.invoices.retrieveUpcoming({
        customer: req.params.customer_id,
      })
      .then((result)=>{
          console.log("Upcoming: " , result.lines.data)
        res.json(result.lines.data)
      })
      .catch((err)=>{
          console.log(err)
          res.json("err")
      })
});
module.exports = router;