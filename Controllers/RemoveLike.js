require("dotenv").config();
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const MongoStore = require("connect-mongo");
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

var LikesDB = require('../Models/Likes');
var likes = new LikesDB();
//endpoint to add user to database
router.post('/API/RemoveLike',
    check('VideoId').isString().escape(),
    check('UserId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            likes.removeLike(
                req.body.UserId,
                req.body.VideoId
            )
                .then(function (like) {
                    res.json(like)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    });
module.exports = router;