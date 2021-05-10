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
//endpoint to add user to database

router.post('/API/Autocomplete', 
    function(req, res){
        console.log("Autocomplete working")
        videos.getMatchingTitles(req.body.text)
        .then((videos)=>{
            console.log(videos)
            res.json(videos);
        })
        .catch((err)=>{
            console.log(err)
            res.json(err)
        })
});
module.exports = router;