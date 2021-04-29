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
    Tags: [Tags],
    Likes: [Likes]
}, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator_Id, Creator, Creator_Email, CreatorImage,
      Title, Description, Link, Tags){
        return new Promise((resolve, reject)=>{
          var tags =[];
          for(var x = 0; x < Tags.length;x++) {
            tags.push({"Name": Tags[x]});
          }
          var video = new VideosDB({
            Creator_Id: Creator_Id,
            Creator: Creator,
            Creator_Email: Creator_Email,
            Creator_Image: CreatorImage,
            Title: Title,
            Description: Description,
            Link: Link,
            Tags: tags
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
            video.likes.push(like);
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
      return VideosDB.findOne({_id: id});
    }
}