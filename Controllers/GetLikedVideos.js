const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var VideosDB = require('../Models/Videos');
var LikesDB = require('../Models/Likes');

var videos_db = new VideosDB();
var likes = new LikesDB();
router.get('/GetLikedVideos/:id', 
    function(req, res){
        //get videos user has liked
        likes.getLikesByUserId(req.params.id)
        .then((videos)=>{
            //create array of video ids
            var videoIds = [];
            for(var i = 0; i < videos.length; i++) {
                videoIds.push(videos[i].VideoId)
            }
            //retrieve videos based on VideoIds array
            videos_db.getVideosByIdArray(videoIds)
            .then((videos)=>{
                res.json(videos)
            })
        })
        .catch((err)=>{
            res.json(err)
        })
});
module.exports = router;