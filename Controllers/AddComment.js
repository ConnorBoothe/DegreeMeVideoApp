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
var CommentsDB = require('../Models/Comments');
var comments = new CommentsDB();

var UserDB = require('../Models/User');
var users = new UserDB();
//add comment to db
router.post('/API/AddComment', 
    check('Video_Id').isString().escape(),
    check('Message').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //get user details
            users.getUser(req.body.User_Id)
            .then((user)=>{
            //add comment
            comments.addComment(
                req.body.Video_Id, 
                user.First_Name,
                user.Last_Name,
                user._id,
                user.Image,
                req.body.Message,
                new Date()
            )
            .then(function(comment){
                res.json(comment)
            })
        })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
        }
});
module.exports = router;