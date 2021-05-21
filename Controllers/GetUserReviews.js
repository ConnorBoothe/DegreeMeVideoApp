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

//endpoint to add user to database
router.get('/API/GetUserReviews/:id',
    function (req, res) {
        console.log("get reviews")
            reviews.getReviewByCreatorId(req.params.id)
            .then((reviews)=>{
                console.log(reviews)
                res.json(reviews)
            })
            .catch((err) => {
                console.log(err)
                res.json(err)
            })
    });
module.exports = router;