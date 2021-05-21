const { ifError } = require("assert");
const mongoose = require("mongoose");
const LikesDB = require("./Likes");
const likes = new LikesDB();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    console.log("Connect")
});
var Schema = mongoose.Schema;
var Tags = new Schema({
  Name: {type:String, required:true}
});
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
    Tags: [Tags],
    Likes: {type: Array},
    Date:{type: Date, required: true}

  }, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator_Id, Creator, Creator_Email,
      Creator_Image, Title, Description, Link, Tags, Thumbnail){
        return new Promise((resolve, reject)=>{
          var tags =[];
            for(var x = 0; x < Tags.length;x++) {
              tags.push({"Name": Tags[x]});
            }
          var video = new VideosDB({
            Creator_Id: Creator_Id,
            Creator: Creator,
            Creator_Email: Creator_Email,
            Creator_Image: Creator_Image,
            Title: Title,
            Description: Description,
            Link: Link,
            Tags: tags, 
            Thumbnail: Thumbnail,
            Views: 0,
            Date:new Date()
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
    getVideosByIdArray(VideoIds){
      console.log("ids", VideoIds)
        return VideosDB.find({_id: {$in: VideoIds}});
    }
    //get creator's videos
    getVideosByCreatorId(CreatorId){
      console.log("creator id", CreatorId)
      return VideosDB.find({Creator_Id: CreatorId})
    }
}