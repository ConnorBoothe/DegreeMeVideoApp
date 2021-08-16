require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    check,
    validationResult
  } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const UserDB = require("../Models/User");
const users = new UserDB();
//recycle this route
router.post('/API/CreateStripePaymentMethod',
    // check('dob').trim(),
    // check('phone').trim().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/home');
        }
        //logic goes here
        var dob = (req.body.dob).split('/');
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