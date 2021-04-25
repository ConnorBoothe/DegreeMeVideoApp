require('dotenv').config();
const express = require('express');
const https = require('https');
const app = module.exports = express(); 
const cors = require('cors');
app.use(cors());

//API Controllers
app.use([
    require("./Controllers/AddVideo")
]); 

//Wildcard route
app.get('*', function(req, res) {
    res.send("Not valid")
});
console.log("Running")
app.listen(8080);

