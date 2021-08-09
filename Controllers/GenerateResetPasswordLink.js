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
var PasswordResetDB = require('../Models/PasswordReset');
var passwordReset = new PasswordResetDB();
//endpoint to add user to database
router.post('/API/GenerateResetPasswordLink',
    function(req, res){
        console.log(req.body.Email)
        users.getUserByEmail(req.body.Email)
        .then((user)=>{
            if(user != null) {
                passwordReset.addPasswordResetRequest(
                    user._id,
                    user.Email
                )
                .then((result)=>{
                    console.log(result)
                    //send email with link
                    //UpdatePassword/result._id?user=user._id
                    res.json("Check your email for the password reset link.")
                })
            } else {
                res.json("Email is not associated with an account.")
            }
        })
        //check if user exists
        //if so, generate random hash and add it to
        //new collection, paired with their email
        //Send email with link that contains hash and email.
        //PW update page should only be accessible if both are present and correct.
        //allow user to update pw there
        //Once pw is updated, invalidate the link (remove from collection)
});
module.exports = router;