
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
});
var Schema = mongoose.Schema;
var TagsSchema = new Schema({
    VideoId: {type: String, required: true},
    Name:{type:String, required: true},
    Date:{type: Date, required: true}
  }, {collection: 'Tags'});
var TagsDB = mongoose.model('Tags', TagsSchema);

module.exports = class Tags {
    //accepts array of tags
    //creates Tag object to conform to Schema
    //format: {VideoId: id, Name: Name}
    addTags(tagsArray, VideoId){
        var tagObjects = [];
        for(var x = 0; x < tagsArray.length; x++) {
            tagObjects.push({
                VideoId: VideoId, 
                Name: tagsArray[x],
                Date: new Date()
            })
        }
        console.log(tagObjects)
        return TagsDB.insertMany(tagObjects)
    }
    getVideoIdsByTag(Name){
        return TagsDB.find({Name: Name})
    }
    getVideoIdsByTagArray(TagsArray){
        var regexQueries = [];
        for(var x = 0; x < TagsArray.length; x++) {
            regexQueries.push({"Name": { "$regex": TagsArray[x], "$options": "i" },})
        }
        return TagsDB.find({ 
            $or: regexQueries
        }).sort({"_id": 1});
    }
    getTagsByVideoId(VideoId){
        return TagsDB.find({VideoId: VideoId});
    }
    //add single tag to video
    addSingleTag(VideoId, Name){
        return new Promise((resolve, reject)=>{
            var tag = new TagsDB({
                VideoId: VideoId,
                Name: Name,
                Date: new Date()
            })
            tag.save()
            .then((result)=>{
                console.log(result)
                TagsDB.find({VideoId: VideoId})
                .then((tags)=>{
                    var tagsArray = [];
                    for(var x in tags){
                        tagsArray.push([tags[x]._id, tags[x].Name]);
                    }
                    console.log(tagsArray)
                    resolve(tagsArray)
                })
            })
            .catch((err)=>{
                resolve(err)
            })

        })
        
    }
    removeAllVideoTags(VideoId){
        return TagsDB.find({VideoId: VideoId}).deleteMany()
    }
    removeSingleTag(videoId, id){
        return new Promise((resolve, reject)=>
        {
            TagsDB.findOne({_id: id}).deleteOne()
            .then((result)=>{
                TagsDB.find({VideoId: videoId})
                .then((tags)=>{
                    var tagsArray = [];
                    for(var x in tags){
                        tagsArray.push([tags[x]._id, tags[x].Name])
                    }
                    console.log(tagsArray)
                    resolve(tagsArray);
                })
            })
            .catch((err)=>{
                resolve(error)
            })
        })
       
    }
}