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
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();
//endpoint to add user to database

router.post('/API/AddVideoTag',
    check('videoId').isString().escape(),
    check('name').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            tags.addSingleTag(
                req.body.videoId,
                req.body.name
            )
            .then((result)=>{
                res.json(result)
            })
        }
    });
    router.post('/API/RemoveVideoTag',
    check('videoId').isString().escape(),
    check('tagId').isString().escape(),
    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            tags.removeSingleTag(req.body.videoId, req.body.tagId)
                .then((result) => {
                    res.json(result)
                })
                .catch((err) => {
                    res.json(err)
                })
        }
    });
module.exports = router;