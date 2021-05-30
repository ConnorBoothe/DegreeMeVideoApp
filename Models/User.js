const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    First_Name: {type:String, required: true},
    Last_Name:{type:String, required: true},
    Email:{type:String, required:true},
    Password:{type:String, required:true},
    Image:{type:String, required:true},
    Subscription_Level: {type:String, required:true},
    Verification_Code: {type:Number, required:true},
    Account_Verified: {type:Boolean, required:true},
    Bio:{type:String},
    Stripe_Id: {type:String},
    Videos:{type: Array}
}, {collection: 'User'});
var UserDB = mongoose.model('User',UserSchema);

module.exports = class User {
     //add user to db
     addUser(First_Name, Last_Name, Email, Password,
        Subscription_Level){
        return new Promise((resolve, reject)=>{
        const defaultImages = [
            "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/default-profile-images%2Fcircle_degreeMe_logo_4.png?alt=media&token=94de9ef2-573a-4b1f-a5c3-edf56c1855cc",
            "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/default-profile-images%2Fcircle_degreeMe_logo_2.png?alt=media&token=dc792ec6-9909-4ef8-ba6f-56b87818cdee",
            "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/default-profile-images%2Fcircle_degreeMe_logo_1.png?alt=media&token=2fa89c02-1341-414a-84a1-943ee00fde6b",
            "https://firebasestorage.googleapis.com/v0/b/degreeme-bd5c7.appspot.com/o/default-profile-images%2Fcircle_degreeMe_logo.png?alt=media&token=c56774ca-891b-47b9-9616-a3011347e78b",
        ];
        var verificationCode = Math.floor(Math.random() * 10000);
        //get random number between 0-3 and select that index of defaultImages array
        var randomNum = Math.floor(Math.random() * Math.floor(4));
        var randomImg = defaultImages[randomNum];
          var user = new UserDB({
            First_Name: First_Name,
            Last_Name: Last_Name,
            Email: Email,
            Password: Password,
            Image: randomImg,
            Subscription_Level: "Free Tier",
            Verification_Code: verificationCode,
            Account_Verified: false
          })
          user.save()
          .then((user)=>{
            console.log(user)
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
    login(Email){
        console.log("Logging you in...")
        console.log("Email", Email)
        return UserDB.findOne({Email: Email});
    }
    //get user by id
    getUser(id){
      return UserDB.findOne(
        {
          _id:id
        });
    }
     //get user by id
     getUserByEmail(email){
      return UserDB.findOne(
        {
          Email:email
        });
    }
    updateAvatar(id, avatar){
      return new Promise((resolve, reject)=>{
        UserDB.findOne(
          {
            _id:id
          })
          .then((user)=>{
            user.Image = avatar;
            user.save()
            resolve(user)
          })
      })
    }
    updateBio(id, bio){
      return new Promise((resolve, reject)=>{
        UserDB.findOne(
          {
            _id:id
          })
          .then((user)=>{
            user.Bio = bio;
            user.save()
            resolve(user)
          })
      })
    }
}