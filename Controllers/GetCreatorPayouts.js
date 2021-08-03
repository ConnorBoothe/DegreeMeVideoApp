const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
//get date 6 months ago
var date = new Date();
date.setMonth(date.getMonth() - 6)
date.setMinutes(0)
date.setDate(0)
date.setSeconds(0)
router.get('/API/GetCreatorPayouts/:accountId',
    function (req, res) {
        //get date six months from now
        var date = new Date();
        date.setMonth(date.getMonth() - 5)
        //Get all transfers for last 6 months
        //sort by month, total each month, then insert
        stripe.transfers.list({
            limit: 100,
            destination: req.params.accountId,
            created: {
                gte: date
            }
        })
            .then((result) => {
                //each index represents a monthly total
                //begin with current month - 6 months at index 0
                var tableValues = [0, 0, 0, 0, 0, 0];
                console.log("Get month: ",date.getMonth())

                for (var i in result.data) {
                    var month = new Date(result.data[i].created * 1000).getMonth();
                    var amount = Math.round(result.data[i].amount)/ 100;
                    
                    switch (month) {
                        
                        case date.getMonth():
                            tableValues[0] += result.data[i].amount/100;
                            break;
                        case date.getMonth() + 1:
                            tableValues[1] += (result.data[i].amount/100);
                            break;
                        case date.getMonth() + 2:
                            tableValues[2] += result.data[i].amount/100;
                            break;
                        case date.getMonth() + 3:
                            tableValues[3] += result.data[i].amount/100;
                            break;
                        case date.getMonth() + 4:
                            tableValues[4] += amount;
                            break
                        case date.getMonth() + 5:
                            tableValues[5] += result.data[i].amount/100;
                            break;
                        default:
                            console.log("default ran")
                            break;
                    }
                }
                console.log(tableValues)
                res.json(tableValues)
            })
    });
module.exports = router;
