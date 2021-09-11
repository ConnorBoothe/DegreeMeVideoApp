const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
const {
    check,
    validationResult
} = require('express-validator');
var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//endpoint to add user to database

router.post('/API/UpdateVideoTitle',
    check('videoId').isString().escape(),
    check('title').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);
    console.log(req.body)
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            videos.updateTitle(req.body.videoId, req.body.title)
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    });
module.exports = router;