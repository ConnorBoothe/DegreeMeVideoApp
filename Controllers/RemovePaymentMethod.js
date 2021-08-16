const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
router.post('/API/RemovePaymentMethod', 
    check('PaymentMethodId').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
        //make payment method default
        stripe.paymentMethods.detach(
            req.body.PaymentMethodId
          ).then((result)=>{ 
              res.json(result) 
      })
      .catch((err)=>{
          console.log(err)
      })
    }
});
module.exports = router;