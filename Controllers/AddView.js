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
router.post('/API/AddView', 
    function(req, res){
            videos.addView(
                req.body.VideoId, 
            )
            .then(function(video){
                console.log("view added")
                console.log(video)
                res.json(video)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
});
module.exports = router;