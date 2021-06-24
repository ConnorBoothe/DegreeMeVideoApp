require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    check,
    validationResult
  } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
router.post('/API/CreateStripeAccount',
    // check('dob').trim(),
    check('phone').trim().escape(),
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
        stripe.account.create({
                type: 'custom',
                requested_capabilities: ['card_payments', 'transfers' ],
                business_type: 'individual',
                business_profile: {
                    mcc: '8299',
                    product_description: 'DegreeMe Contractor'
                },
                tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: req.connection.remoteAddress, //Assuming no proxy is being used
                },
                individual: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dob: {
                        day: dob[1],
                        month: dob[0],
                        year: dob[2],
                    },
                    address: {
                        line1: req.body.street_number,
                        postal_code: req.body.postal_code,
                        city: req.body.city,
                        state: req.body.state,
                        country: req.body.country, //need to convert to ISO 3166-1 alpha-2 code (Hardcoded to stay 'US' for now on views page)
                    },
                    email: req.body.email,
                    phone: phone,
                    // ssn_last_4: req.body.ssn,
                    id_number: "000-00-0000"
                },
                settings: {
                    payouts: {
                        schedule: {
                            //delay_days: 0,
                            interval: "monthly",
                            monthly_anchor:31
                        }
                    }
                }
            },
            function (err, account) {
                if (err != null) {
                    console.log(err)
                    // console.log(err);
                    res.json(encodeURIComponent(err));
                    // some error
                    // res.redirect('/oops');<-This page needs to be made
                } else {
                    
                    console.log(account.id);
                    //save account id to database
                    //create Bank Account
                    console.log('creating bank account');
                    stripe.accounts.createExternalAccount(
                        account.id, {
                            external_account: { //for attatching bank accounts/credit cards
                                object: 'bank_account',
                                country: 'US',
                                currency: 'usd',
                                routing_number: req.body.routing_number,
                                account_number: req.body.account,
                            },
                        },
                        function (err, bankAccount) {
                            if (err != null) {
                                console.log(err);
                                // res.redirect('/MyFinances?errmsg=' + encodeURIComponent(err));
                                //some error
                            } else {
                                console.log(bankAccount);
                                //add the stripeId to user's account
                           
                                //update the session
                                res.json('MyFinances?msg=Seller%20Account%20Created!%20Create%20a%20Tutor%20Listing%20to%20Start%20Earning');
                            }
                        }
                    );
                }
            }
        );
    });
module.exports = router;