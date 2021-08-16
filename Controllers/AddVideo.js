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
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();
var UserDB = require('../Models/User');
var users = new UserDB();
//endpoint to add video
//done
router.post('/API/AddVideo',
    check('Creator_Id').isString().escape(),
    check('Title').isString().escape(),
    check('Description').isString().escape(),
    check('Link').isString().escape(),
    check('tags').isArray(),
    check('Thumbnail').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add video to DB if validation succeeds
            users.getUser(req.body.Creator_Id)
                .then((user) => {
                    console.log("user", user)
                    videos.addVideo(
                        user._id,
                        user.First_Name + " " + user.Last_Name,
                        user.Email,
                        user.Image,
                        req.body.Title,
                        req.body.Description,
                        req.body.Link,
                        req.body.Thumbnail,
                        req.body.tags
                    )
                        .then(function (video) {
                            var newTags = [];
                            for (var x = 0; x < req.body.tags.length; x++) {
                                if (req.body.tags[x].includes(" ")) {
                                    var splitArray = req.body.tags[x].split(" ");
                                    for (var y = 0; y < splitArray.length; y++) {
                                        newTags.push(splitArray[y]);
                                    }
                                }
                                else {
                                    newTags.push(req.body.tags[x]);
                                }
                            }
                            tags.addTags(newTags, video._id)
                                .then(() => {
                                    res.json(video)
                                })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    res.json(err)
                })
        }
    });
module.exports = router;