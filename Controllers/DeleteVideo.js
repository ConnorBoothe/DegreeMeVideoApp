const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
const {
    check,
    validationResult
} = require('express-validator');
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add user to database

router.post('/API/DeleteVideo',
    check('videoId').isString().escape(),
    function (req, res) {
        console.log("deleting the vid")
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //get link to delete from firebase
            videos.getVideoById(req.body.videoId)
            .then((video)=>{
                //remove video
                videos.removeVideoById(
                    req.body.videoId
                )
                .then((result)=>{
                    //remove tags
                    tags.removeAllVideoTags(req.body.videoId)
                    .then((result)=>{
                        res.json(video.Link)
                    })
                })
            })
            
        }
    });
    router.post('/API/RemoveVideoTag',
    check('videoId').isString().escape(),
    check('tagId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            tags.removeSingleTag(req.body.videoId, req.body.tagId)
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    });
module.exports = router;