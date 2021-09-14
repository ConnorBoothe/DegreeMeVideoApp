const { ifError } = require("assert");
const mongoose = require("mongoose");
const LikesDB = require("./Likes");
const TagsDB = require("./Tags");
const likes = new LikesDB();
const tags = new TagsDB();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
});
var Schema = mongoose.Schema;
// var TagsSchema = new Schema({
//   Name: {type: String, required: true}
// })
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
    Tags: {type: Array},
    ResultRank: {type:Number}
  }, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator_Id, Creator, Creator_Email,
      Creator_Image, Title, Description, Link, Thumbnail, Tags){
        return new Promise((resolve, reject)=>{
          var tagsArray = []
          for(var x = 0; x < Tags.length; x++) {
            tagsArray.push({Name: Tags[x]});
          }
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
            // Tags: tagsArray
          })
          video.save()
          .then(()=>{
            resolve(video)
          })
          .catch((err)=>{
            reject(err)
          })
      })
     }
    //get video by id
    getVideoById(id){
      return new Promise((resolve, reject)=>{
        if(!mongoose.Types.ObjectId.isValid(id)){
          resolve(null)
        }
        else {
        VideosDB.findOne({_id: id})
        .then((video)=>{
          likes.getLikesByVideo(video._id)
          .then((likes)=>{
            video.Likes = likes;
            tags.getTagsByVideoId(video._id)
            .then((tags)=>{
              var tagsArray = [];
              for(var x in tags) {
                tagsArray.push([tags[x]._id, tags[x].Name])
              }
              video.Tags = tagsArray;
              resolve(video)
            })
          })
        })
        .catch((err)=>{
          reject(err)
        })
        }
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
      return new Promise((resolve, reject)=>{
        const hash = new Map([...idHashMap.entries()].sort((a, b) => b[1] - a[1]));
        VideosDB.find({_id: {$in: VideoIds}})
          .sort({"_id": -1})
          .then((videos)=>{
            var sortedVideos = [];
            //need to reduce runtime for larger datasets
  
            hash.forEach((value, key)=>{
              for(var y in videos) {

                if(videos[y]._id == key && value > 0){
                  videos[y].ResultRank = value;
                  sortedVideos.push(videos[y])
                }
              }
              })
           //now that we have videos sorted by tag relevance
           //we can sort deeper based on views
              sortedVideos.sort(function(a, b) {
                return parseFloat(b.Views) - parseFloat(a.Views);
            });
            resolve(sortedVideos)
          })
      })
      
        
    }
      //get videos given array of video ids
      getVideosByIdArray(VideoIds){
          return VideosDB.find({_id: {$in: VideoIds}});
      }
    //get creator's videos
    getVideosByCreatorId(CreatorId){
      return VideosDB.find({Creator_Id: CreatorId})
    }
    //remove video by id
    removeVideoById(id) {
      return VideosDB.deleteOne({_id: id})
    }
    //update title
    updateTitle(id, title){
      return VideosDB.findOne({_id: id}).updateOne({Title: title})
    }
    //update Description
    updateDescription(id, description){
      return VideosDB.findOne({_id: id}).updateOne({Description: description})
    }
    removeVideosByCreatorId(Creator_Id){
      return VideosDB.findOne({Creator_Id: Creator_Id}).deleteMany();
    }
}