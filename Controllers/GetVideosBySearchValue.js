const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
    resave: false,
    saveUninitialized: true
}));
var TagsDB = require('../Models/Tags');
var tags = new TagsDB();

var VideosDB = require('../Models/Videos');
var videos = new VideosDB();
//count num of duplicates in array
function countDuplicates(array_elements) {
    let idMap = new Map();
    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                idMap.set(current, cnt)
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        idMap.set(current, cnt)
    }
    return idMap;
}

router.get('/API/GetVideosBySearchValue/:value',
    function (req, res) {
        //break each word by space to create an array of words
        //search for those words in Tags DB and return video ids
        //get videos by id array
        var tagsArray = req.params.value.split(" ");
        tags.getVideoIdsByTagArray(tagsArray)
        .then((videoIds)=>{
            //Possibly split tags on the backend
            //then check if split tags matches anything in the split sentence
            //down side => Seach input: ITSC 1212 Return: Would return 
            //all itsc videos and all 1212 videos
            //Maybe not a bad thing. But I need to rank most relevant first... how?
            //Lets start with this approach and build from there.

            //What if i save the full tag to video DB, then the split tags to tags DB
            //search by split tags, then check video DB tag to see if it matches user input
            //Query: How to write an if statement
            //Check to see how many tags in tags DB match with the query,
            //Then, list the videos from items with most matches to items with least
            var videoIdArray = [];
            for(var x = 0; x < videoIds.length; x++) {
                videoIdArray.push(videoIds[x].VideoId)
            }
           var idHashMap = countDuplicates(videoIdArray);
            videos.getVideoResults(videoIdArray, idHashMap)
            .then((videos)=>{
                res.json(videos)
            })
        })
        .catch((err) => {
            res.json(err)
        })
    });
module.exports = router;