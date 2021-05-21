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
var ReviewsDB = require('../Models/Reviews');
var reviews = new ReviewsDB();
//endpoint to add review to database

router.post('/API/AddReview', 
    check('Creator_Id').isString().escape(),
    check('Author_Id').isString().escape(),
    check('Author_First_Name').isString().escape(),
    check('Author_Last_Name').isString().escape(),
    check('Author_Img').isString().escape(),
    check('Message').isString().escape(),
    check('Rating').isNumeric(),
    function(req, res){
        console.log(req.body)
        const errors = validationResult(req);
        console.log("Adding review")
        if (!errors.isEmpty()) {
            console.log(errors)
        return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add review to DB
            reviews.addReview(
                req.body.Creator_Id, 
                req.body.Author_Id,
                req.body.Author_First_Name,
                req.body.Author_Last_Name,
                req.body.Author_Img,
                req.body.Message,
                req.body.Rating,
                new Date()
            )
            .then(function(review){
                res.json(review)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
        }
});
module.exports = router;