const { ifError } = require("assert");
const mongoose = require("mongoose");
const LikesDB = require("./Likes");
const likes = new LikesDB();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    console.log("Connect")
});
var Schema = mongoose.Schema;
var TagsSchema = new Schema({
  Name: {type: String, required: true}
})
var VideoSchema = new Schema({
    Creator_Id:{type:String, required: true},
    Creator:{type:String, required: true},
    Creator_Email:{type:String, required: true},
    Creator_Image:{type:String, required: true},
    Title:{type:String, required:true},
    Description:{type:String, required:true},
    Link: {type:String, required:true},
    Thumbnail: {type:String, required:true},
    Views: {type:Number, required:true},
    Likes: {type: Array},
    Date:{type: Date, required: true},
    Tags: [TagsSchema],
    ResultRank: {type:Number}
  }, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator_Id, Creator, Creator_Email,
      Creator_Image, Title, Description, Link, Thumbnail, Tags){
        console.log("Tags input", Tags)
        return new Promise((resolve, reject)=>{
          var tagsArray = []
          for(var x = 0; x < Tags.length; x++) {
            tagsArray.push({Name: Tags[x]});
          }
          console.log("Tags array", tagsArray)
          var video = new VideosDB({
            Creator_Id: Creator_Id,
            Creator: Creator,
            Creator_Email: Creator_Email,
            Creator_Image: Creator_Image,
            Title: Title,
            Description: Description,
            Link: Link,
            Thumbnail: Thumbnail,
            Views: 0,
            Date:new Date(),
            Tags: tagsArray
          })
          video.save()
          .then(()=>{
            console.log(video)
            resolve(video)
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
     }
    //get video by id
    getVideoById(id){
      return new Promise((resolve, reject)=>{
        VideosDB.findOne({_id: id})
        .then((video)=>{
          likes.getLikesByVideo(video._id)
          .then((likes)=>{
            console.log("per likes", likes)
            video.Likes = likes;
            console.log("Likes" ,video.Likes)
            console.log("Video", video)
            resolve(video)
          })
        })
        .catch((err)=>{
          reject(err)
        })
      })
      
    }
    //get video by id
    getAllVideos(){
      return VideosDB.find({},"_id Views Title Thumbnail Creator Creator_Image Date").limit(4);
    }
    //add view to video
    addView(id){
      return new Promise((resolve, reject)=>{
        VideosDB.findOne({_id: id})
        .then((video)=>{
          if(video != null){
            video.Views = ++video.Views;
            video.save();
            resolve(video)
          }
         
        })
      })
    }
    getMatchingTitles(title){
      return VideosDB.find({Title: {$regex: title, $options: "i"}},
      "Title");
    }
    //get videos given array of video ids
    //needs to work well with 1000 videos for time being
    //give each video doc an attribute of resultRank
    //add Rank to each doc and then sort query by rank
    
    getVideoResults(VideoIds, idHashMap){
      console.log("hashMap: " ,idHashMap)
      return new Promise((resolve, reject)=>{
        const hash = new Map([...idHashMap.entries()].sort((a, b) => b[1] - a[1]));
        VideosDB.find({_id: {$in: VideoIds}})
          .sort({"_id": -1})
          .then((videos)=>{
            var sortedVideos = [];
            //Runtime of O(n^2)
            //need to reduce for larger datasets
            hash.forEach((value, key)=>{
              for(var y in videos) {
                if(videos[y]._id == key && value > 1){
                  videos[y].ResultRank = value;
                  sortedVideos.push(videos[y])
                }
              }
              })
           //now that we have videos sorted by tag relevance
           //we can sort deeper based on views
              console.log("Sorted vids", sortedVideos)
              //sorty by views
              sortedVideos.sort(function(a, b) {
                return parseFloat(b.Views) - parseFloat(a.Views);
            });
            resolve(sortedVideos)
          })
      })
      
        
    }
      //get videos given array of video ids
      getVideosByIdArray(VideoIds){
        console.log("ids", VideoIds)
          return VideosDB.find({_id: {$in: VideoIds}});
      }
    //get creator's videos
    getVideosByCreatorId(CreatorId){
      return VideosDB.find({Creator_Id: CreatorId})
    }
}