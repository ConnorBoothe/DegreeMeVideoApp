const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();

var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//get videos by tag
router.get('/API/GetVideoByTag/:tag',
    function (req, res) {
        console.log("running search by tag")
        tags.getVideoIdsByTag(req.params.tag)
        .then((videoIds)=>{
            var videoIdArray = [];
            for(var x = 0; x < videoIds.length; x++) {
                videoIdArray.push(videoIds[x].VideoId)
            }
            console.log("Id array tag", videoIdArray)
            videos.getVideosByIdArray(videoIdArray)
            .then((videos)=>{
                res.json(videos)
            })
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
    });
module.exports = router;