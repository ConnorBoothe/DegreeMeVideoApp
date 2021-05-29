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
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();
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
            req.body.Thumbnail,
            req.body.tags
        )
         .then(function(video){
             console.log("Add tags")
             var newTags = [];
             for(var x = 0; x < req.body.tags.length; x++){
                if(req.body.tags[x].includes(" ")){
                    console.log("INCLUDES SPACE")
                    var splitArray = req.body.tags[x].split(" ");
                    console.log(splitArray)
                    for(var y = 0; y < splitArray.length; y++){
                        newTags.push(splitArray[y]);
                    }
                }
                else {
                    newTags.push(req.body.tags[x]);
                }
            }
             tags.addTags(newTags, video._id)
             .then(()=>{
                 console.log(video)
                res.json(video)
             })
         })
         .catch((err)=>{
             console.log(err)
             res.json(err)
         })
    }
        
    
    
});
module.exports = router;