const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var ViewsDB = require('../Models/Views');
var views = new ViewsDB();
//get creator reviews by id
router.get('/API/GetAllCreatorViews/:id',
    function(req, res){
        views.getViewCountByCreatorId(req.params.id)
        .then((views)=>{
            console.log("View count " + views)
            res.json(views)
        })
        .catch((err)=>{
            console.log(err)
            res.json(err);
        })
});
module.exports = router;