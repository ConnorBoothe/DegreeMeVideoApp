const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
// });
var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
    Creator_Id:{type:String, required: true},
    Author_Id:{type:String, required: true},
    Author_First_Name:{type:String, required: true},
    Author_Last_Name:{type:String, required: true},
    Author_Img:{type:String, required: true},
    Message:{type:String, required:true},
    Rating:{type:Number, required: true},
    Date:{type:Date, required:true},
}, {collection: 'Reviews'});
var ReviewsDB= mongoose.model('Reviews', ReviewSchema);

module.exports = class Reviews {
     //add review to db
     addReview(Creator_Id, Author_Id, Author_First_Name,
         Author_Last_Name, Author_Img, Message, Rating, Date){
        return new Promise((resolve, reject)=>{
          var review = new ReviewsDB({
            Creator_Id: Creator_Id,
            Author_Id: Author_Id,
            Author_First_Name: Author_First_Name,
            Author_Last_Name: Author_Last_Name,
            Author_Img: Author_Img,
            Message: Message,
            Rating: Rating,
            Date: Date
          })
          ReviewsDB.find({
            $and: [{
              Creator_Id: Creator_Id,
              Author_Id: Author_Id,
            }]
          })
          .then((reviews)=>{
            if(reviews.length < 1) {
              review.save()
              .then(()=>{
                resolve(review)
              })
            }
            else{
              resolve(false)
            }
          })
          .catch((err)=>{
            reject(err)
          })
        
      })
     }
     //get creator reviews
     getReviewByCreatorId(Creator_Id){
        return ReviewsDB.find({Creator_Id: Creator_Id})
     }
}