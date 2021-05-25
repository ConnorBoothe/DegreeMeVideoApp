const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var ViewsSchema = new Schema({
    UserId: {type:String, required:true},
    VideoId: {type:String, required:true},
    CreatorId: {type:String, required:true},
    Date: {type:Date, required:true}
  }, {collection: 'Views'});
var ViewsDB = mongoose.model('Views', ViewsSchema);

module.exports = class Views {
     //add comment to db
     addView(UserId, CreatorId, VideoId){
         return new Promise((resolve, reject)=>{
            var view = new ViewsDB({
                UserId: UserId,
                VideoId: VideoId,
                CreatorId: CreatorId,
                Date: new Date()
            })
            view.save()
            .then(()=>{
                ViewsDB.find({VideoId: VideoId}).countDocuments()
                .then((count)=>{
                    resolve(count);
                })

            })
         })
        
     }
     getViewCountByVideoId(VideoId){
        return ViewsDB.find({VideoId: VideoId}).countDocuments();
     }
     //get total view count, monthly view count, percentage of total
     getViewCountByCreatorId(CreatorId){
        return new Promise((resolve, reject)=>{
            var result = [];
            ViewsDB.find({CreatorId: CreatorId},"_id").countDocuments()
            .then((count)=>{
                result.push(count)
                ViewsDB.find({
                    $and : [
                        {
                           CreatorId: CreatorId,
                           Date: {$gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                       }
                    ]
                   }, "_id").countDocuments()
                   .then((monthlyCount)=>{
                       result.push(monthlyCount)
                       ViewsDB.find({},"_id").countDocuments()
                       .then((allCount)=>{
                           result.push(allCount);
                           resolve(result);
                       })
                   })
            })
        })
        
     }

     getCurrentMonthViewCount(CreatorId){
        // new Date(date.getFullYear(), date.getMonth(), 1)
       return ViewsDB.find({
         $and : [
             {
                CreatorId: CreatorId,
                Date: {$gte: new Date(date.getFullYear(), date.getMonth(), 1)}
            }
         ]
        }).countDocuments();
    }
    getCurrentMonthViewCountByCreatorId(CreatorId){
        return ViewsDB.find({
            $and:
            [
                {
                    CreatorId: CreatorId
                }
            ]
          //where date < beginning this month
         }).countDocuments();
     }
}