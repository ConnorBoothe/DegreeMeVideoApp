require("dotenv").config();
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

const LikesDB = require('../Models/Likes');
const NotificationsDB = require('../Models/Notifications');

var likes = new LikesDB();
var notifications = new NotificationsDB();

var UserDB = require('../Models/User');
var users = new UserDB();

//endpoint to add like to video
//done
router.post('/API/AddLike',
    check('Creator_Id').isString().escape(),
    check('VideoId').isString().escape(),
    check('UserId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.getUser(req.body.UserId)
                .then((user) => {
                    likes.addLike(
                        req.body.VideoId,
                        user._id,
                        user.First_Name,
                        user.Last_Name,
                        user.Image
                    )
                        .then(function (like) {
                            if (like != false) {
                                notifications.addNotification(
                                    req.body.Creator_Id,
                                    user._id,
                                    user.First_Name,
                                    user.Last_Name,
                                    user.Image,
                                    "Liked your video",
                                    req.body.VideoId
                                )
                                    .then(() => {
                                        res.json(like)
                                    })
                            }
                            else {
                                res.json(false);
                            }
                        })
                })
                .catch((err) => {
                    res.json(false)
                })
        }
    });
module.exports = router;