const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var PayoutSchema = new Schema({
    Creator_Id: {type:String, required: true},
    Date:{type:String, required: true},
    Amount:{type:Number, required: true}
}, {collection: 'Payouts'});
var PayoutsDB = mongoose.model('Payouts', PayoutSchema);

module.exports = class Payouts {
     //add payout to db
     addPayout(Creator_Id, Date, Amount){
        return new Promise((resolve, reject)=>{
          var payout = new PayoutsDB({
            Creator_Id: Creator_Id,
            Date: Date,
            Amount: Amount
          })
          payout.save()
          .then(()=>{
            resolve(payout)
          })
          .catch((err)=>{
            reject(err)
          })
      })
     }
     //get creator's payouts
    getPayoutsByCreatorId(Creator_Id){
        //find payouts by creator id
        return PayoutsDB.find({Creator_Id: Creator_Id});
    }
    //update user subscription level
    getPayoutsById(id){
        //find user by id
        return PayoutsDB.findOne({_id: id});
    }
}