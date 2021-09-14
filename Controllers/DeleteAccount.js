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
//endpoint to delete user to database
//done
router.post('/API/DeleteAccount', 
    check('userId').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add user to DB if validation succeeds
            //encrypt password
            users.deleteAccount(req.body.userId)
            .then((result)=>{
                res.json(result)
            })
        }
});
module.exports = router;