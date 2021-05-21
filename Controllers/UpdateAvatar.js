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
router.post('/API/UpdateAvatar', 
    function(req, res){
        users.updateAvatar(
            req.body.userId, 
            req.body.avatar
        )
        .then(function(user){
            console.log(user)
            res.json(user)
        })
        .catch((err)=>{
            console.log(err)
            res.json(err)
        })
   
});
module.exports = router;