const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var PasswordResetSchema = new Schema({
    UserId: {type: String, required: true},
    Email: {type: String, required: true}
}, {collection: 'PasswordReset'});
var PasswordResetDB = mongoose.model('PasswordRest', PasswordResetSchema);

module.exports = class Comment {
     addPasswordResetRequest(userId, email){
        var pwResetRequest = new PasswordResetDB({
          UserId: userId,
          Email: email
        })
        return pwResetRequest.save()
     }
     getPasswordResetRequest(id){
      return PasswordResetDB.findOne({_id:id});
   }
   removePasswordRestRequest(id){
    return PasswordResetDB.deleteOne({_id:id});
 }
}