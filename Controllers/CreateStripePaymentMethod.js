require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    check,
    validationResult
  } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const UserDB = require("../Models/User");
const users = new UserDB();
router.post('/API/CreateStripePaymentMethod',
    // check('dob').trim(),
    // check('phone').trim().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/home');
        }
        console.log(req.body)
        //logic goes here
        var dob = (req.body.dob).split('/');
        console.log(dob)
        var phone = (req.body.phone).replace(/-/g, "");
        //phone=phone.replaceAll("-","")
        stripe.createPaymentMethod ({
                type: 'card',
                card: cardElement,
                billing_details: {
                name: 'Connor Boothe',
    },
               
        });
    })
           
module.exports = router;