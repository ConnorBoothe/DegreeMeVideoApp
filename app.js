require('dotenv').config();
const express = require('express');
const app = module.exports = express(); 
const cors = require('cors');

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
    require("./Controllers/GetVideosBySearchValue"),
    require("./Controllers/AddKeyWordsToProfile"),
    require("./Controllers/GetKeyWords"),
    require("./Controllers/RemoveKeyWords"),

]); 

//Wildcard route
app.get('*', function(req, res) {
    res.send("Not valid")
});
console.log("Running")
app.listen(8080);

