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
var UserDB = require('../Models/User');
var users = new UserDB();
//endpoint to add user to database
router.post('/API/AddUser', 
    check('First_Name').isString().escape(),
    check('Last_Name').isString().escape(),
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    check('Image').isString().escape(),
    check('Subscription_Level').isString().escape(),
    check('Verification_Code').isNumeric(),
    function(req, res){
        const errors = validationResult(req);
        console.log("Adding user")
        if (!errors.isEmpty()) {
            console.log(errors)
        return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add video to DB if validation succeeds
            //encrypt password
            bcrypt.hash(pw, 8)
            .then((hash)=>{
                users.addUser(
                    req.body.First_Name, 
                    req.body.Last_Name,
                    req.body.Email,
                    hash,
                    req.body.Image,
                    req.body.Subscription_Level,
                    req.body.Verification_Code
                    )
                .then(function(user){
                    console.log(user)
                    res.json(user)
                })
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
        }
});
module.exports = router;