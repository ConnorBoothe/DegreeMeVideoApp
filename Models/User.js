const mongoose = require("mongoose");
var UserClass = require("../Classes/User")
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
    Stripe_Customer_Id: {type:String},
    Videos:{type: Array},
    Stripe_Acct_Id: {type: String},
    Stripe_Bank_Acct_Id: {type: String},
    Free_Tier_Seconds: {type: Number}
  }, {collection: 'User'});
var UserDB = mongoose.model('User',UserSchema);
function hasBankAccount(Stripe_Bank_Acct_Id){
  if(Stripe_Bank_Acct_Id !== undefined) {
      return true;
  }
  else {
      return false;
  }
}
module.exports = class User {
     //add user to db
     addUser(First_Name, Last_Name, Email, Password,
        CustomerId, SubTier){
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
            Subscription_Level: SubTier,
            Verification_Code: verificationCode,
            Account_Verified: false,
            Stripe_Customer_Id: CustomerId,
            Free_Tier_Seconds:0
          })
          user.save()
          .then((user)=>{
            resolve(
              new UserClass(user._id, user.First_Name,
                user.Last_Name, user.Image, user.Subscription_Level,
                user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
            )
          })
          .catch((err)=>{
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
    //reset Free_Tier_Seconds to 0
    resetFreeTierSeconds(userId){
      return UserDB.findOne({_id: userId})
      .updateOne({Free_Tier_Seconds: 0});
    }
    getFreeTierUsers(){
      return UserDB.find({Subscription_Level: "Free Tier"},"_id");
    }
    //update free_tier_seconds count
    updateFreeTierSeconds(userId, secondsToAdd){
      return new Promise((resolve, reject)=>{
        UserDB.findOne({_id: userId}, "Free_Tier_Seconds")
        .then((seconds)=>{
          if(seconds.Free_Tier_Seconds !== undefined) {
            seconds.Free_Tier_Seconds += secondsToAdd;
            // console.log(seconds.Free_Tier_Seconds)
          }
          else {
            seconds.Free_Tier_Seconds = secondsToAdd;
          }
          seconds.save()
          .then(()=>{
            //send the new user object to frontend
            UserDB.findOne({_id: userId})
            .then((user)=>{
              resolve(user)
            })
          })
        })
        .catch((error)=>{
            reject(error)
        })
      })
     
    }
    //get stripe account id by user id
    getStripeAccountId(userId){
      return UserDB.findOne({_id: userId}, "Stripe_Acct_Id")
    }
    //get customer id by user id
    getCustomerId(userId){
      if(mongoose.Types.ObjectId.isValid(userId)) {
        return UserDB.findOne({_id: userId}, "Stripe_Customer_Id")
      }
      else {
        return new Promise((resolve, reject)=>{ resolve(null)});
      }
    }
    //get users with stripe bank account
     getUsersWithStripeBankAccount(){
      return UserDB.find({
        Stripe_Bank_Acct_Id: 
        {
          $exists: true
        }
      },"_id Stripe_Bank_Acct_Id Stripe_Acct_Id")
    }
    //update user subscription level
    updateSubscriptionLevel(UserId, SubscriptionLevel){
        //find user by id
        return new Promise((resolve, reject)=>{
          UserDB.findOne({_id: UserId}).updateOne({Subscription_Level: SubscriptionLevel})
          .then((result)=>{
            UserDB.findOne({_id: UserId})
            .then((user)=>{
              console.log(user)
              console.log(user.Subscription_Level)
              console.log("USER: " ,
              new UserClass(user._id, user.First_Name,
                user.Last_Name, user.Image, user.Subscription_Level,
                user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
              )
              resolve(
              new UserClass(user._id, user.First_Name,
                user.Last_Name, user.Image, user.Subscription_Level,
                user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
              )
            })
                })
          .catch((err)=>{
            resolve("error")
          })
        })
        
    }
    //attempt to login user
    login(Email){
        return UserDB.findOne({Email: Email},"First_Name Last_Name Image "+
        "Email Password Subscription_Level Stripe_Bank_Acct_Id");
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
    //update password
    updatePassword(userId, password){
      return UserDB.findOne(
        {
          _id:userId
        }).updateOne({
          Password: password
        })  
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
            resolve(
              new UserClass(user._id, user.First_Name,
              user.Last_Name, user.Image, user.Subscription_Level,
              user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
              )
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
            resolve(
              new UserClass(user._id, user.First_Name,
              user.Last_Name, user.Image, user.Subscription_Level,
              user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
              )
          })
      })
    }
    addStripeBankAccount(id, account_id, bank_id){
      return new Promise((resolve, reject)=>{
        UserDB.findOne(
          {
            _id:id
          }).updateOne({
            Stripe_Acct_Id : account_id,
            Stripe_Bank_Acct_Id : bank_id
          })
          .then(()=>{
            UserDB.findOne(
              {
                _id:id
              })
              .then((user)=>{
                resolve(
                  new UserClass(user._id, user.First_Name,
                    user.Last_Name, user.Image, user.Subscription_Level,
                    user.Free_Tier_Seconds, hasBankAccount(user.Stripe_Bank_Acct_Id))
                )
              })
            })
          .catch((err)=>{
            resolve(err)
          })
      })
    }
    
    
}