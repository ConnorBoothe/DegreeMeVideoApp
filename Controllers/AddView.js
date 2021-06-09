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

var ViewsDB = require('../Models/Views');
var views = new ViewsDB();
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add user to database
router.post('/API/AddView', 
    function(req, res){
      var userId = "none";
        if(req.body.UserId != undefined) {
          userId = req.body.UserId
        }
            views.addView(
                userId,
                req.body.CreatorId,
                req.body.VideoId, 
            )
            .then(function(views){
                videos.addView(req.body.VideoId)
                .then(()=>{
                  res.json(views)
                })
               
            })
            .catch((err)=>{
                res.json(err)
            })
});
module.exports = router;