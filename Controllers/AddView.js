require("dotenv").config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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

var ViewsDB = require('../Models/Views');
var views = new ViewsDB();
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add view to video

router.post('/API/AddView',
  check('UserId').isString().escape(),
  check('CreatorId').isString().escape(),
  check('VideoId').isString().escape(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      if (req.body.UserId != "none") {
        userId = req.body.UserId;
        videos.getVideoById(req.body.VideoId)
          .then((video) => {
            //check if viewer is creator
            if (req.body.UserId == video.Creator_Id) {
              res.json(false)
            }
            else {
              //if viewer is not creator, add view
              views.addView(
                userId,
                req.body.CreatorId,
                req.body.VideoId,
              )
                .then(function (views) {
                  videos.addView(req.body.VideoId)
                    .then(() => {
                      res.json(views)
                    })

                })
                .catch((err) => {
                  res.json(err)
                })
            }
          })
      }
    }

  });
module.exports = router;