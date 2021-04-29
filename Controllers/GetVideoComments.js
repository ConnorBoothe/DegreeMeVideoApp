const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var CommentsDB = require('../Models/Comments');
var comments = new CommentsDB();
//endpoint to add user to database

router.get('/API/Comments/:id', 
    function(req, res){
        comments.getCommentByVideoId(req.params.id)
        .then((comment)=>{
            res.json(comment);
        })
        .catch((err)=>{
            console.log(err)
            res.json(err)
        })
});
module.exports = router;