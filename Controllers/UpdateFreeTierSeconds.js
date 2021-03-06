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
const UserDB = require('../Models/User');
const users = new UserDB();

//endpoint to add seconds to Free_Tier_Seconds
router.post('/API/UpdateFreeTierSeconds',
    check('UserId').isString().escape(),
    check('secondsToAdd').isNumeric(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            users.updateFreeTierSeconds(req.body.UserId, req.body.secondsToAdd)
                .then((seconds) => {
                    res.json(seconds)
                })
                .catch((error) => {
                    res.json(error)
                })
        }

    });
module.exports = router;