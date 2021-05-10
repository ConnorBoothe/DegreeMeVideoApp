const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    console.log("Connect")
});
var Schema = mongoose.Schema;
var Tags = new Schema({
  Name: {type:String, required:true}
});
var Likes = new Schema({
  UserId: {type:String, required:true},
  First_Name: {type:String, required:true},
  Last_Name: {type:String, required:true},
  Image: {type:String, required:true}
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
    Likes: [Likes]
}, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator, Creator_Email,
      Title, Description, Link, Tags, Thumbnail){
        console.log(Creator, Creator_Email,
          Title, Description, Link, Tags, Thumbnail)
        return new Promise((resolve, reject)=>{
          var tags =[];
          // if(Tags) {
            for(var x = 0; x < Tags.length;x++) {
              tags.push({"Name": Tags[x]});
            }
          // }
          var video = new VideosDB({
            Creator_Id: "Creator_Id",
            Creator: Creator,
            Creator_Email: Creator_Email,
            Creator_Image: "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/userImages%2F%40cboothe?alt=media&token=32d57150-275d-4a88-8417-090498ffeada",
            Title: Title,
            Description: Description,
            Link: Link,
            Tags: tags, 
            Thumbnail: Thumbnail,
            Views: 0
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
     //add like to video
     addLike(VideoId, UserId, First_Name, Last_Name, Image){
        return new Promise((resolve, reject)=>{
          //find video by id
          VideosDB.findOne({_id: VideoId})
          .then((video)=>{
            //create like object from params and push to video
            //model
            var like = {
              UserId: UserId,
              First_Name: First_Name,
              Last_Name: Last_Name,
              Image: Image
            };
            video.Likes.push(like);
            video.save()
            .then(()=>{
              //resolve the like if successful
              resolve(like)
            })
          })
          .catch((err)=>{
            //reject if error
            reject(err)
          })
         
        });
    }
    //get video by id
    getVideoById(id){
      console.log(id)
      return VideosDB.findOne({_id: id});
    }
    //get video by id
    getAllVideos(){
      return VideosDB.find({},"_id Views Title Thumbnail Creator").limit(4);
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
}