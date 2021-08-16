require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
const {
    check,
    validationResult
  } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const UserDB = require("../Models/User");
const users = new UserDB();
//error
//route will not work
//recycle this route, not in use
router.post('/API/CreateStripeCustomer',
    check('dob').trim(),
    check('phone').trim().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/home');
        }
        else{
            //create stripe customer account, assign to
            //it the payment method object for the customer
            //this will save customer payment data for re-charge
            stripe.customers.create({
                email:req.body.email,
                name:req.body.first_name + " " + req.body.last_name,
                metadata:{
                    // school:docs[0].school,
                    // subscription:docs[0].subscription,
                }
            })
            .then((customer)=>{
            })
        }
        
        })
           
module.exports = router;

