const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var LikesSchema = new Schema({
    UserId: {type:String, required:true},
    VideoId: {type:String, required:true},
    First_Name: {type:String, required:true},
    Last_Name: {type:String, required:true},
    Image: {type:String, required:true},
    Date: {type:Date, required:true}
  }, {collection: 'Likes'});
var LikesDB = mongoose.model('Likes', LikesSchema);

module.exports = class Comment {
     //add comment to db
     addLike(VideoId, UserId, First_Name, Last_Name,
         Image){
        return new Promise((resolve, reject)=>{
          //check if user has liked the video
          LikesDB.find({
              $and: [{
                UserId: UserId,
                VideoId, VideoId
              }]
            })
          .then((likes)=>{
            if(likes.length < 1){
              var like = new LikesDB({
                VideoId: VideoId,
                UserId: UserId,
                First_Name: First_Name,
                Last_Name: Last_Name,
                Image: Image,
                Date: new Date()
              })
              like.save()
              .then((like)=>{
                resolve(like)
              })
              .catch((err)=>{
                resolve(false)
              })
            }
            else{
              resolve(false);
            }
          })
          
      })
     }
     getLikesByVideo(VideoId){
        return LikesDB.find({VideoId: VideoId})
     }
     getLikesByUserId(UserId){
        return LikesDB.find({UserId: UserId}, "VideoId")
     }
     removeLike(UserId, VideoId){
       return LikesDB.deleteOne({
         $and: [
           {UserId: UserId},
           {VideoId: VideoId}
          ]
        })
    }
}