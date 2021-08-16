const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const stripe = require('stripe')(process.env.STRIPE_KEY);

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
var KeywordsDB = require('../Models/UserKeyWords');
var keywords = new KeywordsDB();
//endpoint to add user to database
//done
router.post('/API/AddUser', 
    check('First_Name').isString().escape(),
    check('Last_Name').isString().escape(),
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    check('Keywords').isArray(),
    check('Subscription').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add user to DB if validation succeeds
            //encrypt password
            users.getUserByEmail(req.body.Email)
            .then((user)=>{
                if(user == null){
                    bcrypt.hash(req.body.Password, 8)
                    .then((hash)=>{
                        //create stripe customer acct
                        stripe.customers.create({
                            email:req.body.Email,
                            name:req.body.First_Name + " " + req.body.Last_Name,
                            payment_method: req.body.PaymentMethodId,
                            invoice_settings: {
                                default_payment_method: req.body.PaymentMethodId
                            },
                            metadata:{
                                // school:docs[0].school,
                                // subscription:docs[0].subscription,
                            }
                        })
                        .then((customer)=>{
                            new Promise((resolve, reject)=>{
                                if(req.body.Subscription === "Pro Tier"){
                                     stripe.subscriptions.create({
                                        customer: customer.id,
                                        items: [
                                          {price: 'price_1J8uQ2EKHHXXF01HWqZv0vOv'},
                                        ],
                                      })
                                      .then((sub)=>{
                                        resolve(sub)
                                      })
                                }
                                else{
                                    resolve(false)
                                }
                            })
                            
                            
                        users.addUser(
                            req.body.First_Name, 
                            req.body.Last_Name,
                            req.body.Email,
                            hash,
                            customer.id,
                            req.body.Subscription
                            )
                        .then(function(user){
                            if(req.body.Keywords.length > 0) {
                                keywords.addManyKeywords(user._id, req.body.Keywords)
                            }
                            res.json(user)
                            
                            
                        })
                    })
                })
                    .catch((err)=>{
                        res.json(err)
                    })
                }
                else{
                    //email already in use
                    res.json("This email is already in use");
                }
            })
            
        }
});
module.exports = router;