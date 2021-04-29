const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var CollectedPaymentsSchema = new Schema({
    User_Id: {type:String, required: true},
    Date:{type:String, required: true},
    Amount:{type:Number, required: true}
}, {collection: 'Collected_Payments'});
var PaymentsDB = mongoose.model('Collected_Payments', CollectedPaymentsSchema);

module.exports = class Collected_Payments {
     //add payout to db
     addPayment(User_Id, Date, Amount){
        return new Promise((resolve, reject)=>{
          var payment = new PaymentssDB({
            User_Id: User_Id,
            Date: Date,
            Amount: Amount
          })
          payment.save()
          .then(()=>{
            resolve(payment)
          })
          .catch((err)=>{
            reject(err)
          })
      })
     }
     //get payments by user id
    getPaymentsByUserId(User_Id){
        //find payouts by creator id
        return PaymentsDB.find({User_Id: User_Id});
    }
}