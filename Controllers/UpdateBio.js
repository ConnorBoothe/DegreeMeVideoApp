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
//endpoint to add user to database
router.post('/API/UpdateBio',
    check('userId').isString().escape(),
    check('bio').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.updateBio(
                req.body.userId,
                req.body.bio
            )
                .then(function (user) {
                    res.json(user)
                })
                .catch((err) => {
                    res.json(err)
                })
        }

    });
module.exports = router;