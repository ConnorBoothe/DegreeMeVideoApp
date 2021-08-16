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

const bcrypt = require("bcrypt");
//endpoint to add user to database
router.post('/API/UpdatePassword',
    check('userId').isString().escape(),
    check('password').isString(),
    check('req_id').isString(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            bcrypt.hash(req.body.password, 8)
                .then((hash) => {
                    users.updatePassword(req.body.userId, hash)
                        .then((result) => {
                            console.log(result)
                            if (result.nModified > 0) {
                                //remove request from pw reset request db
                                //pass success message
                                passwordReset.removePasswordRestRequest(req.body.req_id)
                                    .then((result1) => {
                                        res.json([true, "Your password has been updated."])
                                    })
                            }
                            else {
                                res.json([false, "An error occurred. Please try again."])
                            }
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    });
module.exports = router;