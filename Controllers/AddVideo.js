const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add user to database
router.post('/API/AddVideo', 
check('Creator').isString().escape(),
check('Email').isString().escape(),
check('Title').isString().escape(),
check('Description').isString().escape(),
check('Link').isString().escape(),

function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        //add video to DB if validation succeeds
        videos.addVideo(
            req.body.Creator, 
            req.body.Email,
            req.body.Title,
            req.body.Description,
            req.body.Link,
            req.body.tags
            )
         .then(function(video){
             res.json(video)
         })
         .catch((err)=>{
             res.json(err)
         })
    }
        
    
    
});
module.exports = router;