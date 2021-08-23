
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
}