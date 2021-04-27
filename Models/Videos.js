const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    console.log("Connect")
});
var Schema = mongoose.Schema;
var Tags = new Schema({
  Name: {type:String, required:true}
});
var VideoSchema = new Schema({
    Creator:{type:String, required: true},
    Creator_Email:{type:String, required: true},
    Title:{type:String, required:true},
    Description:{type:String, required:true},
    Link: {type:String, required:true},
    Tags: [Tags]
   
}, {collection: 'Videos'});
var VideosDB = mongoose.model('Videos',VideoSchema);

module.exports = class Videos {
     //add video to db
     addVideo(Creator, Creator_Email, Title, Description,
      Link, Tags){
        return new Promise((resolve, reject)=>{
          var tags =[];
          for(var x = 0; x < Tags.length;x++) {
            tags.push({"Name": Tags[x]});
          }
          var video = new VideosDB({
            Creator: Creator,
            Creator_Email: Creator_Email,
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

  
}