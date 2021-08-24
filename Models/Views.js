const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
const UserDB = require("./User");
const users = new UserDB();
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
            ViewsDB.findOne({CreatorId: CreatorId},"_id").countDocuments()
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
                        ViewsDB.find({
                            Date: {$gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                           }, "_id").countDocuments()
                           .then((allMonthlyViewsCount)=>{
                               result.push(allMonthlyViewsCount)
                                resolve(result);
                           })
                           
                           
                       })
                       
                   })
            })
        })
        
     }

     //get view count percentages for each
     //user that has a bank account
     async getViewCountPercentages(){
            //get total views
            //need to get views from first of last month until now
            var firstDayLastMonth = new Date();
            //get last month
            firstDayLastMonth.setMonth(firstDayLastMonth.getMonth()-1)
            //set day
            firstDayLastMonth.setDate(1);
            firstDayLastMonth.setHours(0, 0, 0, 0);
            //get views where date is GTE first day
            //of last month
            const totalViews = await ViewsDB.find({
                Date:{
                    $gte: firstDayLastMonth
                }
        }).countDocuments();
            //get users with Stripe Bank account
            const usersWithBankAccounts = await users.getUsersWithStripeBankAccount()
            var viewCountPerUser = [];
            //iterate through users, creating
            //an object that maps userId to
            //percentage of total views
            for(var i in usersWithBankAccounts) {
                    const viewsPerUser = await ViewsDB.find({
                        CreatorId: usersWithBankAccounts[i]._id
                    })
                    viewCountPerUser.push({_id: usersWithBankAccounts[i]._id, 
                        bankAccountId: usersWithBankAccounts[i].Stripe_Bank_Acct_Id,
                        percentageOfViews: viewsPerUser.length/totalViews,
                        accountId: usersWithBankAccounts[i].Stripe_Acct_Id
                    });
                }
                //return array of objects mapping
                //userId to percentage of view count
                return viewCountPerUser;
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