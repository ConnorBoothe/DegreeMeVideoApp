require("dotenv").config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
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
//user db
const UserDB = require('../Models/User');
const users = new UserDB();
//user class
var User = require('../Classes/User');
function hasBankAccount(Stripe_Bank_Acct_Id){
    if(Stripe_Bank_Acct_Id !== undefined) {
        return true;
    }
    else {
        return false;
    }
}
//endpoint to add user to database
router.post('/API/Login', 
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.login(req.body.Email)
            .then((user)=>{
                if(user) {
                    //decrypt password and compare to user input
                    bcrypt.compare(
                        req.body.Password,
                        user.Password,
                        function (err, match) {
                            //password matches
                            if(match){
                                res.json(
                                    new User(user._id, user.First_Name, 
                                        user.Last_Name, user.Image,
                                        user.Subscription_Level, 
                                        hasBankAccount(user.Stripe_Bank_Acct_Id)
                                    )
                                )
                            }
                            else {
                                res.json(false)
                            }
                    })
                }
                else {
                    res.json(false)
                }
                
            })
        }
});
module.exports = router;