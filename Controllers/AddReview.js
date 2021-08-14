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
var ReviewsDB = require('../Models/Reviews');
var reviews = new ReviewsDB();

var UserDB = require('../Models/User');
var users = new UserDB();
//endpoint to add review to database
router.post('/API/AddReview',
    check('Creator_Id').isString().escape(),
    check('User_Id').isString().escape(),
    check('Message').isString().escape(),
    check('Rating').isNumeric(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.getUser(req.body.User_Id)
                .then((user) => {
                    //add review to DB
                    reviews.addReview(
                        req.body.Creator_Id,
                        user._id,
                        user.First_Name,
                        user.Last_Name,
                        user.Image,
                        req.body.Message,
                        req.body.Rating,
                        new Date()
                    )
                        .then(function (review) {
                            res.json(review)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    res.json(err)
                })
        }
    });
module.exports = router;