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
//done
router.post('/API/AddKeywords', 
    check('userId').isString().escape(),
    check('word').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            //add user to DB if validation succeeds
            //encrypt password
            keywords.addKeyword(req.body.userId, req.body.word)
            .then((user)=>{
                res.json(user)
            })
            
        }
});
module.exports = router;