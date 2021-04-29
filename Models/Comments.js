const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    Video_Id: {type:String, required: true},
    Author_First_Name:{type:String, required: true},
    Author_First_Name:{type:String, required: true},
    Author_Id:{type:String, required:true},
    Author_Img:{type:String, required:true},
    Message: {type:String, required:true},
    Rating: {type:Number, required:true},
    Date: {type:Date, required:true},
}, {collection: 'Comments'});
var CommentsDB = mongoose.model('Comments', CommentsSchema);

module.exports = class Comment {
     //add comment to db
     addComment(Video_Id, Author_First_Name, Author_Last_Name,
         Author_Id, Author_Img, Message, Rating, Date){
        return new Promise((resolve, reject)=>{
          var comment = new CommentsDB({
            Video_Id: Video_Id,
            Author_First_Name: Author_First_Name,
            Author_Last_Name: Author_Last_Name,
            Author_Id: Author_Id,
            Author_Img: Author_Img,
            Message: Message,
            Rating: Rating,
            Date: Date
          })
          comment.save()
          .then(()=>{
            resolve(comment)
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
     }
     //get all comments related to video newest to
     //oldest
     getCommentByVideoId(Video_Id){
        return CommentsDB.find({ Video_Id: Video_Id })
        .sort({ Date: 1})
     }
    //get comment by id
    getCommentById(id){
        return CommentsDB.findOne({ _id: id });
     }
}