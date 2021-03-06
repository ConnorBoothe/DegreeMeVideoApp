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
router.post('/API/CreateStripeAccount',
    check('user_id').isString().trim(),
    check('dob').isDate(),
    check('postal_code').isString(),
    check('city').trim(),
    check('state').trim().escape(),
    check('country').trim(),
    check('phone').isString(),
    check('ssn').isString().trim(),
    check('routing_number').isString().trim().escape(),
    check('account').isString().trim().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
        }
        else {

        console.log("creati")
        var dob = (req.body.dob).split('-');
        var phone = (req.body.phone).replace(/-/g, "");
        //phone=phone.replaceAll("-","")
        users.getUser(req.body.user_id)
            .then((user) => {
                stripe.account.create({
                    type: 'custom',
                    requested_capabilities: ['card_payments', 'transfers'],
                    business_type: 'individual',
                    business_profile: {
                        mcc: '8299',
                        product_description: 'DegreeMe Content Creator'
                    },
                    tos_acceptance: {
                        date: Math.floor(Date.now() / 1000),
                        ip: req.connection.remoteAddress, //Assuming no proxy is being used
                    },
                    individual: {
                        first_name: user.First_Name,
                        last_name: user.Last_Name,
                        dob: {
                            day: dob[2],
                            month: dob[1],
                            year: dob[0],
                        },
                        address: {
                            line1: req.body.street_number,
                            postal_code: req.body.postal_code,
                            city: req.body.city,
                            state: req.body.state,
                            country: req.body.country, //need to convert to ISO 3166-1 alpha-2 code (Hardcoded to stay 'US' for now on views page)
                        },
                        email: user.Email,
                        phone: phone,
                        ssn_last_4: req.body.ssn,
                    },
                    //payouts set to manual
                    settings: {
                        payouts: {
                            schedule: {
                                interval: "monthly",
                                monthly_anchor: 31
                            }
                        }
                    }
                })
                    .then((account) => {
                        //save account id to database
                        //create Bank Account
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
                                    console.log(err)
                                    res.json(err)
                                } else {
                                    //add the stripeId to user's account
                                    users.addStripeBankAccount(req.body.user_id,
                                        account.id, bankAccount.id)
                                        .then((user) => {
                                            res.json(user);
                                        })
                                }
                            }
                        );

                    })
                    .catch((err) => {
                        console.log(err)
                        res.json(err)
                    })
            })
            .catch((err) => {
                res.json(err)
            })
        }
    })

module.exports = router;