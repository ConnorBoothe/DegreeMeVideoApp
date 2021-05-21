require("dotenv").config();
const express = require('express');
const router = express.Router();
const session = require("express-session");

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
router.use(
  session({
  //   store: MongoStore.create({
  //     mongoUrl: process.env.MONGO_URL,
  //   }),
  secret: 'whatever',
  secure: false,
  httpOnly: false
  })
);
const LikesDB = require('../Models/Likes');
const NotificationsDB = require('../Models/Notifications');
const { resolve } = require("path");

var likes = new LikesDB();
var notifications = new NotificationsDB();

//endpoint to add user to database
router.post('/API/AddLike', 
    check('VideoId').isString().escape(),
    function(req, res){
        console.log("Adding like")
        console.log(req.body)
            likes.addLike(
                req.body.VideoId, 
                req.body.UserId,
                req.body.First_Name,
                req.body.Last_Name,
                req.body.Image
            )
            .then(function(like){
                if(like != false) {
                    notifications.addNotification(
                        req.body.Creator_Id,
                        req.body.UserId,
                        req.body.First_Name,
                        req.body.Last_Name,
                        req.body.Image,
                        "Liked your video",
                        req.body.VideoId
                    )
                        .then(()=>{
                            res.json(like)
                        })
                }
                else{
                    resolve(like);
                }
                
            })
            .catch((err)=>{
                // console.log(err)
                res.json(false)
            })
});
module.exports = router;