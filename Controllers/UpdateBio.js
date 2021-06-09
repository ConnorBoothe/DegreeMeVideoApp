const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
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
var UserDB = require('../Models/User');
var users = new UserDB();
//endpoint to add user to database
router.post('/API/UpdateBio', 
    function(req, res){
        users.updateBio(
            req.body.userId, 
            req.body.bio
        )
        .then(function(user){
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
   
});
module.exports = router;