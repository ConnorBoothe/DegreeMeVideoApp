require('dotenv').config();
const express = require('express');
const router = express.Router();
const CronJob = require('cron').CronJob;

const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const ViewsDB = require("../Models/Views");
const views = new ViewsDB();
async function transferToStripeAccounts(){
    //get all stripe subscriptions
    const subscriptions = await stripe.subscriptions.list({
        price: 'price_1J8uQ2EKHHXXF01HWqZv0vOv',
        limit: 100
      })
    //get user view count percentages
    const userViewCountPercentages = await views.getViewCountPercentages();
      var totalRevenueMinusFees = (subscriptions.data.length * 8) - ((subscriptions.data.length * 8 * .029) +(subscriptions.data.length * .3));
      var totalPayouts = totalRevenueMinusFees * .2; 
      for(var i in userViewCountPercentages) {
        console.log(parseInt(totalPayouts * userViewCountPercentages[i].percentageOfViews * 100))
          //if user has views, transfer money to their account
        if(userViewCountPercentages[i].percentageOfViews > 0) {
          console.log(userViewCountPercentages[i].accountId)
            await stripe.transfers.create({
                amount: parseInt(totalPayouts * userViewCountPercentages[i].percentageOfViews * 100),
                currency: 'usd',
                destination: userViewCountPercentages[i].accountId,
              });
        }
      }
}
//Scenario: What if all funds are not settled by EOM?
//and this results in balance not being great enough to
//payout what is owed... 
//This would only become an issue if we get
//a large number of subscribers on the last couple days
//of the month.
//Run job on 1st day of month at 12:00 AM 
// transferToStripeAccounts();

var job = new CronJob('0 0 1 * * ', function() {
  transferToStripeAccounts();
}, null, true, 'America/New_York');
job.start();     
module.exports = router;
