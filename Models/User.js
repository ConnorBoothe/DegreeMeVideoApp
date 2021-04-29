const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    First_Name: {type:String, required: true},
    Creator_Email:{type:String, required: true},
    Last_Name:{type:String, required: true},
    Email:{type:String, required:true},
    Password:{type:String, required:true},
    Subscription_Level: {type:String, required:true},
    Verification_Code: {type:Number, required:true},
    Account_Verified: {type:Boolean, required:true},
    Stripe_Id: {type:String},

}, {collection: 'User'});
var UserDB = mongoose.model('User',UserSchema);

module.exports = class User {
     //add user to db
     addUser(First_Name, Last_Name, Email, Password,
      Subscription_Level, Verification_Code){
        return new Promise((resolve, reject)=>{
          var user = new UserDB({
            First_Name: First_Name,
            Last_Name: Last_Name,
            Email: Email,
            Password: Password,
            Subscription_Level: Subscription_Level,
            Verification_Code: Verification_Code,
            Account_Verified: false
          })
          user.save()
          .then(()=>{
            console.log(video)
            resolve(user)
          })
          .catch((err)=>{
            console.log(err)
            reject(err)
          })
      })
     }
     //verify user account
    verifyAccount(UserId){
        //find user by id
        return UserDB.findOne({_id: UserId})
        .updateOne({Account_Verified: true});
    }
    //update user subscription level
    updateSubscriptionLevel(UserId, SubscriptionLevel){
        //find user by id
        return UserDB.findOne({_id: UserId})
        .updateOne({Subscription_Level: SubscriptionLevel});
    }
    //attempt to login user
    login(Email, Password){
        return UserDB.find(
          {
            $and:
              [{
                Email: Email,
                Password: Password
              }]
          }
          );
    }
      //get user
      getUser(id){
        return UserDB.find(
          {
            _id:id
          });
    }
}