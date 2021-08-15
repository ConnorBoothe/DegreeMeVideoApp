class User {
    constructor(Id, First_Name, Last_Name, Image,
       Subscription_Level, Free_Tier_Seconds, hasBankAccount ){
        this._id = Id
        this.First_Name =  First_Name
        this.Last_Name = Last_Name
        this.Image = Image
        this.Subscription_Level = Subscription_Level
        this.Free_Tier_Seconds = Free_Tier_Seconds
        this.hasBankAccount = hasBankAccount
    }

}
module.exports = User;