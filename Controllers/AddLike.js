require("dotenv").config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require("express-session");
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
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
      secret: "toolbox1217!",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 6 * 60 * 60 * 1000 },
    })
  );
var VideoDB = require('../Models/Videos');
var videos = new VideoDB();
//endpoint to add user to database
router.post('/API/AddLike', 
    check('First_Name').isString().escape(),
    check('Last_Name').isString().escape(),
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    check('Subscription_Level').isString().escape(),
    check('Verification_Code').isNumeric(),
    function(req, res){
        console.log("Adding like")
            videos.addLike(
                req.body.VideoId, 
                req.session.user._id,
                req.session.user.First_Name,
                req.session.user.Last_Name,
                req.session.user.Image,
            )
            .then(function(user){
                console.log(user)
                res.json(user)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
});
module.exports = router;