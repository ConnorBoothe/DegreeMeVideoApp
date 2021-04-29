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
//endpoint to add user to database

router.post('/API/AddComment', 
    check('Video_Id').isString().escape(),
    check('Author_First_Name').isString().escape(),
    check('Author_Last_Name').isString().isEmail().escape(),
    check('Author_Id').isString().escape(),
    check('Author_Img').isString().escape(),
    check('Message').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        console.log("Adding comment")
        if (!errors.isEmpty()) {
            console.log(errors)
        return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add comment to DB
            comments.addComment(
                req.body.Video_Id, 
                req.body.Author_First_Name,
                req.body.Author_Last_Name,
                req.body.Author_Id,
                req.body.Author_Img,
                req.body.Message,
                req.body.Rating,
                new Date()
            )
            .then(function(comment){
                console.log(comment)
                res.json(comment)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
        }
});
module.exports = router;