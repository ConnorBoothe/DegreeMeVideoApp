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
//endpoint to generate password reset
router.post('/API/GenerateResetPasswordLink',
    check('Email').isString().trim(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/home');
        }
        else {
            users.getUserByEmail(req.body.Email)
                .then((user) => {
                    if (user != null) {
                        passwordReset.addPasswordResetRequest(
                            user._id,
                            user.Email
                        )
                            .then((result) => {
                                //send email with link
                                //UpdatePassword/result._id?user=user._id
                                res.json("Check your email for the password reset link.")
                            })
                    } else {
                        res.json("Email is not associated with an account.")
                    }
                })
        }
    });
module.exports = router;