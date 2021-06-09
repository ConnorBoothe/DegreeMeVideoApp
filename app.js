require('dotenv').config();
const express = require('express');
const https = require('https');
const app = module.exports = express(); 
const cors = require('cors');

var whitelist = ['https://firebasestorage.googleapis.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors({
  origin: 'http://localhost:3000'
}));

//API Controllers
app.use([
    require("./Controllers/AddVideo"),
    require("./Controllers/Login"),
    require("./Controllers/AddComment"),
    require("./Controllers/AddReview"),
    require("./Controllers/AddUser"),
    require("./Controllers/GetUser"),
    require("./Controllers/GetUserVideos"),
    require("./Controllers/GetCreatorReviews"),
    require("./Controllers/GetVideoComments"),
    require("./Controllers/GetCommentById"),
    require("./Controllers/GetVideoById"),
    require("./Controllers/GetAllVideos"),
    require("./Controllers/AddLike"),
    require("./Controllers/AddView"),
    require("./Controllers/SearchAutocomplete"),
    require("./Controllers/GetLikedVideos"),
    require("./Controllers/RemoveLike"),
    require("./Controllers/GetNotifications"),
    require("./Controllers/UpdateAvatar"),
    require("./Controllers/UpdateBio"),
    require("./Controllers/GetUserReviews"),
    require("./Controllers/SeenNotifications"),
    require("./Controllers/GetUnreadNotificationCount"),
    require("./Controllers/GetCreatorTotalViews"),
    require("./Controllers/GetVideosByTag"),
    require("./Controllers/GetVideosBySearchValue")
]); 

//Wildcard route
app.get('*', function(req, res) {
    res.send("Not valid")
});
console.log("Running")
app.listen(8080);

