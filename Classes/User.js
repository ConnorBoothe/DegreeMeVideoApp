class User {
    constructor(id, First_Name, Last_Name, Image,
       Subscription_Level, hasBankAccount ){
        this._id = id
        this.First_Name =  First_Name
        this.Last_Name = Last_Name
        this.Image = Image
        this.Subscription_Level = Subscription_Level
        this.hasBankAccount = hasBankAccount
    }

}
module.exports = User;