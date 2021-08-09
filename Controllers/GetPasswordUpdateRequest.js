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

var PasswordResetDB = require('../Models/PasswordReset');
var passwordReset = new PasswordResetDB();
//endpoint to add user to database
router.post('/API/GetPasswordUpdateRequest',
    function(req, res){
        console.log(req.body.request_id)
        passwordReset.getPasswordResetRequest(req.body.request_id)
        .then((result)=>{
            console.log(result)
           if(result._id !== undefined){
               res.json([true, result.UserId])
           }
           else {
               console.log(false)
               res.json([false, null])
           }
        })
        .catch((err)=>{
            res.json([false, null])
        })
        //check if user exists
        //if so, generate random hash and add it to
        //new collection, paired with their email
        //Send email with link that contains hash and email.
        //PW update page should only be accessible if both are present and correct.
        //allow user to update pw there
        //Once pw is updated, invalidate the link (remove from collection)
});
module.exports = router;