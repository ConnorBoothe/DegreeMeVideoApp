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

var PasswordResetDB = require('../Models/PasswordReset');
var passwordReset = new PasswordResetDB();
//endpoint to ger password update request
router.post('/API/GetPasswordUpdateRequest',
    check('request_id').isString().trim(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/home');
        }
        else {
            passwordReset.getPasswordResetRequest(req.body.request_id)
                .then((result) => {
                    if (result._id !== undefined) {
                        res.json([true, result.UserId])
                    }
                    else {
                        console.log(false)
                        res.json([false, null])
                    }
                })
                .catch((err) => {
                    res.json([false, null])
                })
        }
    });
module.exports = router;