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
    if (todayArray[1] === dateArray[1] & todayArray[2] === dateArray[2]) {
      return "Today";
    } else if (month === "") {
      return "";
    } else {
    if(dateArray[2].split("")[0] === "0"){
      return month + " " +dateArray[2].split("")[1];
    }
    else{
      return month + " " + dateArray[2];
    }
    }
  }
  //takes date object as parameter
  formatTimeFromDate(date) {
    var newDate = new Date(date)
    newDate = newDate.toString().split(" ");
    var timeArray = newDate[4].split(":");
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
        hours = intHours;
      }
      amPm = "AM";
    } else {
      hours = hours % 12;
      amPm = "PM";
    }
    return hours + ":" + minutes + " " + amPm;
  }
  displayTimeSince(date) {
    var difference = Math.abs(new Date() - (new Date(date)));
    var secDifference = parseInt(difference / 1000);
    var minDifference = parseInt(secDifference / 60);
    var hourDifference = parseInt(minDifference / 60);
    var dayDifference = parseInt(hourDifference / 24);
    if(secDifference < 60){
        return secDifference + " seconds ago";
    }
    else if(secDifference < 120){
        return minDifference + " minute ago";
    }
    else if(secDifference > 60 && minDifference < 60){
        return minDifference + " minutes ago";
    }
    else if(minDifference < 120){
        return hourDifference + " hour ago";
    }
    else if(minDifference > 120 && hourDifference < 24){
        return hourDifference + " hours ago";
    }
    else if(hourDifference < 48){
        return dayDifference + " day ago";
    }
    else{
        return dayDifference + " days ago";
    }
  }
  
}
export default FormatDate;