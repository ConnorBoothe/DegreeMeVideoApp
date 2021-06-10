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
var KeyWordsDB = require('../Models/UserKeyWords');
var keywords = new KeyWordsDB();
//endpoint to add user to database
router.get('/API/keywords/:id', 
    function(req, res){
        keywords.getUserKeyWords(req.params.id)
        .then((keywords)=>{
            console.log(keywords)
            res.json(keywords)
        })
});
module.exports = router;