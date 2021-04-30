require("dotenv").config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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
//use session with data store
router.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
      secret: "toolbox1217!",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 6 * 60 * 60 * 1000 },
    })
  );
var UserDB = require('../Models/User');
var users = new UserDB();
//endpoint to add user to database
router.post('/API/Login', 
    check('Email').isString().isEmail().escape(),
    check('Password').isString().escape(),
    function(req, res){
        const errors = validationResult(req);
        console.log("Log in")
        if (!errors.isEmpty()) {
            console.log(errors)
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
                            console.log(match)
                            if(match){
                                req.session.user = user;
                                res.json(user)
                            }
                            else {
                                res.json(false)
                            }
                    })
                }
                else {
                    console.log("User not found")
                    res.json(false)
                }
                
            })
        }
});
module.exports = router;