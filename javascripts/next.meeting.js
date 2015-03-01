/* 
* Dispay Next Meeting
* i.e. calculate nearest first or third tuesday 
*/

// Create new date, create month variable from that date, make empty variable 'tuesdays'
var d = new Date(),
    month = d.getMonth(),
    tuesdays = [];

d.setDate(1);

// Get the first Tuesday in the month
while (d.getDay() !== 2) {
    d.setDate(d.getDate() + 1);
}

// Get the first and third Tuesdays in the month
while (d.getMonth() === month) {
      tuesdays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 14);
}

// New date, get the number
var today = new Date;
var today_date = today.getDate();

// Variables for first value in the array (first tuesday)
var tues1 = tuesdays[0];
var tues1_date = tues1.getDate();
var tues1_month = tues1.getMonth();
var tues1_year = tues1.getFullYear();

// Variables for second value in the array (third tuesday)
var tues3 = tuesdays[1];
var tues3_date = tues3.getDate();
var tues3_month = tues3.getMonth();
var tues3_year = tues3.getFullYear();

// Pretty month names.
var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");


// If today is before the first Tuesday, display that date.
if (today_date < tues1_date) {
  document.getElementById("nextmeeting").innerHTML = "Tuesday, " + m_names[tues1_month] + " " + tues1_date + ", " + tues1_year;
} 
// If today is the same day as a meeting, display "Today!".
else if (today_date == ( tues1_date || tues3_date ) )  {
  document.getElementById("nextmeeting").innerHTML = "Today!";
}
// Otherwise, display the date of the third Tuesday.
else {
  document.getElementById("nextmeeting").innerHTML = "Tuesday, " + m_names[tues3_month] + " " + tues3_date + ", " + tues3_year;
}