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
var videos = new VideosDB();
var ViewsDB = require('../Models/Views');
var views = new ViewsDB();
//endpoint to add user to database

router.get('/API/Video/:id', 
    function(req, res){
        videos.getVideoById(req.params.id)
        .then((video)=>{
            views.getViewCountByVideoId(video._id)
            .then((views)=>{
                console.log("Views", views)
                video.Views = views;
                res.json(video);
            })
            
        })
        .catch((err)=>{
            console.log(err)
            res.json(err)
        })
});
module.exports = router;