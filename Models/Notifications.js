const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;
var NotificationSchema = new Schema({
    UserId: {type:String, required:true},
    Author_UserId: {type:String, required:true},
    Author_First_Name: {type:String, required:true},
    Author_Last_Name: {type:String, required:true},
    Author_Image: {type:String, required:true},
    Message: {type:String, required:true},
    Date: {type:Date, required:true},
    Viewed: {type: Boolean, required: true},
    VideoId: {type:String}
  }, {collection: 'Notifications'});
var NotificationsDB = mongoose.model('Notifications', NotificationSchema);

module.exports = class Notifications {
     //add comment to db
     addNotification(UserId, Author_UserId, Author_First_Name, Author_Last_Name,
         Author_Image, Message, VideoId){
        return new Promise((resolve, reject)=>{
              var notification = new NotificationsDB({
                UserId: UserId,
                Author_UserId: Author_UserId,
                Author_First_Name: Author_First_Name,
                Author_Last_Name: Author_Last_Name,
                Author_Image: Author_Image,
                Message: Message,
                Date: new Date(),
                VideoId: VideoId, 
                Viewed: false
              })
              notification.save()
              .then((notif)=>{
                resolve(notif)
              })
              .catch((err)=>{
                reject(err)
              })
      })
     }
     getNotificationsByUserId(UserId){
        return NotificationsDB.find({UserId: UserId})
        .sort({"Date": -1})
     }
     sawNotifications(UserId){
        return NotificationsDB.find({
          $and: [
            {
              UserId: UserId,
              Viewed: false
            }
          ]
        }).updateMany({Viewed: true})
     }
     getUnreadCount(UserId){
      return NotificationsDB.find({
        $and: [
          {
            UserId: UserId,
            Viewed: false
          }
        ]
      }).countDocuments()
   }
}