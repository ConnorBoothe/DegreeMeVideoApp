const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology: true },function(err){
    
});
var Schema = mongoose.Schema;

var KeywordsSchema = new Schema({
    UserId: {type:String, required: true},
    Word:{type:String, required: true},
}, {collection: 'UserKeywords'});
var KeywordsDB = mongoose.model('UserKeywords', KeywordsSchema);
var UserDB = require("./User")
var user = new UserDB();
module.exports = class KeyWords {
     //add keywords to db
     addKeyword(userId, word){
        return new Promise((resolve, reject)=>{
            var keyword = new KeywordsDB({UserId: userId, Word: word})
            keyword.save()
            .then(()=>{
                //respond with new user object
                user.getUser(userId)
                .then((user)=>{
                    resolve(user)
                })
                .catch((err)=>{
                    reject(err);
                })
            })
        })
    }
    getUserKeyWords(userId){
        return KeywordsDB.find({UserId: userId})
    }
    removeKeyword(userId, word){
        return new Promise((resolve, reject)=>{
            KeywordsDB.deleteOne({
                $and: [{
                    UserId: userId,
                    Word: word
                }]
            })
            .then((result)=>{
                user.getUser(userId)
                .then((user)=>{
                    resolve(user)
                })
            })
            .catch((err)=>{
                resolve(err)
            })
        })
        
    }
}