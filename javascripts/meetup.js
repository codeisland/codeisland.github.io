/* 
  Display next meeting information, via Meetup API
  API Docs: http://www.meetup.com/meetup_api/docs/2/events/
*/
$.ajax({
    type: "POST",
    dataType: 'jsonp',
    url: 'https://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=Rhode-Island-Code-for-America-Brigade&desc=false&offset=0&photo-host=public&format=json&page=1&fields=rsvpable%2Cself&sig_id=182593829&sig=9f6a4af2300cf826f51ea84531ef91cb0b9f9f94',
    crossDomain : true,
    xhrFields: {
        withCredentials: true
    }
})
    .done(function( xhr, textStatus, response, data, responseJSON ) {
            
      // Event URL
      var eventURL = xhr.results[0].event_url;
      document.getElementById("meetupEventURL").href = eventURL;
      
      // RSVP Head Count
      var headCount = xhr.results[0].yes_rsvp_count;
      document.getElementById("meetupHeadCount").innerHTML = headCount;

      // RSVP Status
      var RSVPstatus = xhr.results[0].self.rsvp.response;
      if (RSVPstatus == "yes") {
        var RSVPstatus = "Going";
        document.getElementById("meetupRSVPStatus").innerHTML = ', including you.';
      }
      else {
        var RSVPstatus = "Not Going";
        document.getElementById("meetupRSVPStatus").innerHTML = '. What about you?';
        document.getElementById("meetupCTA").innerHTML = 'RSVP on Meetup';
      }
      
      // Event Date     
      var now = new Date;
      var todayNumber = now.getDate();
      var date = new Date(xhr.results[0].time);
      var dateTime = formatAMPM(date);
      var dateDay = date.getDay();
      var dateNumber = date.getDate();
      var dateMonth = date.getMonth();
      var dateYear = date.getFullYear();
      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      var m_names = new Array("January", "February", "March", 
      "April", "May", "June", "July", "August", "September", 
      "October", "November", "December");
      var d_names = new Array("Sunday", "Monday", "Tuesday", 
      "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
      if (todayNumber == dateNumber) {
        var prettyDate = 'Tonight at ' + dateTime;
      } 
      else {
        var prettyDate = d_names[dateDay] + ', ' + m_names[dateMonth] + ' ' + dateNumber +  ', ' + dateYear + ' at ' + dateTime;
      }
      document.getElementById("meetupDate").innerHTML = prettyDate;

    })
    .fail( function(xhr, textStatus, errorThrown) {
      alert(xhr.responseText);
      alert(textStatus);
    });