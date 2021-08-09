require('dotenv').config();
const express = require('express');
const app = module.exports = express(); 
const cors = require('cors');
const UserDB = require("./Models/Views")
const users = new UserDB();
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
    require("./Controllers/CreateStripeConnectedAccount"),
    require("./Controllers/CreateStripeCustomer"),
    require("./Controllers/AttachPaymentMethodAndSubscribe"),
    require("./Controllers/GetPaymentMethods"),
    require("./Controllers/GetSubscriptions"),
    require("./Controllers/GetStripeCustomer"),
    require("./Controllers/GetPastTransactions"),
    require("./Controllers/GetUpcomingPayments"),
    require("./Controllers/UpdateDefaultPaymentMethod"),
    require("./Controllers/RemovePaymentMethod"),
    require("./Controllers/AddPaymentMethod"),
    require("./Controllers/CancelSubscription"),
    require("./Controllers/AddSubscription"),
    require("./Controllers/TransferFunds"),
    require("./Controllers/UpdateFreeTierSeconds"),
    require("./Controllers/ResetFreeTierSeconds"),
    require("./Controllers/GetCreatorPayouts"),
    require("./Controllers/GetAllEarnings"),
    require("./Controllers/GenerateResetPasswordLink"),
    require("./Controllers/GetPasswordUpdateRequest"),
    require("./Controllers/UpdatePassword")


]); 

//Wildcard route
app.get('*', function(req, res) {
    res.send("Not valid")
});
console.log("Running")
app.listen(8080);

