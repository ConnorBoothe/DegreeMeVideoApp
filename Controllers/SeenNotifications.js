require("dotenv").config();
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

const NotificationsDB = require('../Models/Notifications');
var notifications = new NotificationsDB();

//endpoint to add user to database
router.post('/API/SeenNotifications',
    function(req, res){
        notifications.sawNotifications(
            req.body.user_id
        )
        .then((result)=>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })  
});
module.exports = router;