require("dotenv").config();
const express = require('express');
const router = express.Router();
const session = require("express-session");

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
router.use(
  session({
  //   store: MongoStore.create({
  //     mongoUrl: process.env.MONGO_URL,
  //   }),
  secret: 'whatever',
  secure: false,
  httpOnly: false
  })
);
const NotificationsDB = require('../Models/Notifications');
var notifications = new NotificationsDB();

//endpoint to add user to database
router.get('/API/GetNotifications/:id',
    function(req, res){
        notifications.getNotificationsByUserId(req.params.id)
        .then((notifications)=>{
            res.json(notifications)
        })
        .catch((err)=>{
            res.json(err)
        })  
});
module.exports = router;