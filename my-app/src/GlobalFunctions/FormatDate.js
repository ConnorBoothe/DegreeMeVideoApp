class FormatDate  {
displayDate(date) {
    var dateArray = date.toString().split(" ");
    var todayArray = new Date().toString().split(" ");
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = "";
    for (var x = 0; x < monthArray.length; x++) {
      if (monthArray[x].includes(dateArray[1])) {
        month = monthArray[x];
      }
    }
    if (todayArray[1] == dateArray[1] & todayArray[2] == dateArray[2]) {
      return "Today";
    } else if (month == "") {
      return "";
    } else {
    if(dateArray[2].split("")[0] == "0"){
      return month + " " +dateArray[2].split("")[1];
    }
    else{
      return month + " " + dateArray[2];
    }
    }
  }
  //takes date object as parameter
  formatTimeFromDate(date) {
    // var date = this.convertUTCtoEastern(date)
    var date = new Date(date)
    date = date.toString().split(" ");
    var timeArray = date[4].split(":");
    var minutes = timeArray[1];
    var hours = timeArray[0];
    var intHours = parseInt(hours);
    var amPm = "";
    if (intHours === 12) {
      hours = 12;
      amPm = "AM";
    } else if (intHours === 0) {
      hours = 12;
      amPm = "PM";
    } else if (intHours < 12) {
    if(intHours<10){
        var splitHours = hours.split("");
        hours = intHours;
      }
      hours = hours;
      amPm = "AM";
    } else {
      hours = hours % 12;
      amPm = "PM";
    }
    return hours + ":" + minutes + " " + amPm;
  }
}
export default FormatDate;