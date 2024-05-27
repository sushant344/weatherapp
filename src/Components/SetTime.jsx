import React from 'react'

export default function SetTime() {

  // get day --
  let day = new Date().getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  day = daysOfWeek[day];


  //get month --
  let month = new Date().getMonth();
  const monthofYear = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  month = monthofYear[month];

  // get date --
  let date = new Date().getDate();


  // get year --
  let year = new Date().getFullYear();

  
  // get time --
  let hour = new Date().getHours()
  let min = new Date().getMinutes()

  // func to set 0's for hours < 10 and set time format of 12hrs ---
  let gethour;
  function sethour(){
    if(hour > 12){
        gethour = hour - 12;
        if(gethour < 10){
            gethour = "0"+ gethour;
        }
        return Number.parseInt(gethour);
    }
    else if(hour < 10){
      hour = "0"+ hour;
      return Number.parseInt(hour);
    }
    else if(hour === 0){
      return 12;
    }
    else{
      return Number.parseInt(hour);
    }
  }

  return (
    <p> {day} {month} {date < 10 ? "0"+date : date} {year}, {sethour()}:{min < 10 ? "0"+min : min} {hour > 11 ? "PM" : "AM"}  </p>
  )
  
}