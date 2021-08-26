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
var UserDB = require('../Models/User');
var users = new UserDB();

router.post('/API/UpdateDefaultPaymentMethod',
    check('UserId').isString().escape(),
    check('PaymentMethodId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //make payment method default
            users.getCustomerId(req.body.UserId)
                .then((user) => {
                    stripe.customers.update(
                        user.Stripe_Customer_Id,
                        {
                            invoice_settings: {
                                default_payment_method: req.body.PaymentMethodId
                            }
                        }
                    ).then((result) => {
                        res.json(result)
                    })
                })
                .catch(() => {
                    console.log("ERR")
                })
        }
    });
module.exports = router;