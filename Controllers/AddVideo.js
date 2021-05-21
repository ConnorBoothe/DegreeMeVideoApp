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
// check('Creator').isString().escape(),
// check('Email').isString().escape(),
// check('Title').isString().escape(),
// check('Description').isString().escape(),
// check('Link').isString().escape(),
// check('Thumbnail').isString().escape(),

function(req, res){
    const errors = validationResult(req);
    console.log("Adding video")
    if (!errors.isEmpty()) {
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        console.log(req.body)
        //add video to DB if validation succeeds
        
        videos.addVideo(
            req.body.Creator_Id,
            req.body.Creator, 
            req.body.Email,
            req.body.Creator_Image,
            req.body.Title,
            req.body.Description,
            req.body.Link,
            req.body.tags,
            req.body.Thumbnail
            )
         .then(function(video){
             console.log(video)
             res.json(video)
         })
         .catch((err)=>{
             console.log(err)
             res.json(err)
         })
    }
        
    
    
});
module.exports = router;