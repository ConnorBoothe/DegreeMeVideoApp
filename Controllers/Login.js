require("dotenv").config();
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
router.post('/API/Login', 
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.login(req.body.Email)
            .then((user)=>{
                if(user) {
                    //decrypt password and compare to user input
                    bcrypt.compare(
                        req.body.Password,
                        user.Password,
                        function (err, match) {
                            //password matches
                            if(match){
                                res.json(user)
                            }
                            else {
                                res.json(false)
                            }
                    })
                }
                else {
                    res.json(false)
                }
                
            })
        }
});
module.exports = router;