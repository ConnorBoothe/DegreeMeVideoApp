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
var LikesDB = require('../Models/Likes');
var likes = new LikesDB();
//endpoint to add user to database
router.post('/API/RemoveLike', 
    check('VideoId').isString().escape(),
    check('UserId').isString().escape(),
    function(req, res){
        console.log("Removing like")
        console.log(req.body)
            likes.removeLike(
                req.body.UserId,
                req.body.VideoId
            )
            .then(function(like){
                console.log(like)
                res.json(like)
            })
            .catch((err)=>{
                // console.log(err)
                res.json(err)
            })
});
module.exports = router;