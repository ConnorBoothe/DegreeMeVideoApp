const express = require('express');
const router = express.Router();
const CronJob = require('cron').CronJob;

const UserDB = require("../Models/User");
const users = new UserDB();

async function resetFreeTierSeconds(){
    const freeTierUsers = await users.getFreeTierUsers();
    for(var i in  freeTierUsers){
      await users.resetFreeTierSeconds(freeTierUsers[i]._id);
    }
}
//reset free tier seconds every month
//gives users 10 min free access per month
var job = new CronJob('0 0 1 * * ', function() {
  resetFreeTierSeconds();
}, null, true, 'America/New_York');
job.start();     
module.exports = router;
