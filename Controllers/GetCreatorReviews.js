const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var ReviewsDB = require('../Models/Reviews');
var reviews = new ReviewsDB();
//get creator reviews by id
router.get('/API/GetUserReviews/:id',
    function(req, res){
        reviews.getReviewByCreatorId(req.params.id)
        .then((reviews)=>{
            res.json(reviews)
        })
        .catch((err)=>{
            res.json(err);
        })
});
module.exports = router;