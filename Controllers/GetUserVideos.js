const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var UserDB = require('../Models/User');
var users = new UserDB();

var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add user to database
router.get('/API/GetUserVideos/:id',
    function (req, res) {
                videos.getVideosByCreatorId(req.params.id)
                .then((videos)=>{
                    res.json(videos)
                })
            .catch((err) => {
                res.json(err)
            })

    });
module.exports = router;